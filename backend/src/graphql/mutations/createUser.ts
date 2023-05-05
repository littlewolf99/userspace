/// <reference types="../../@types/global" />

import { getSession } from "../../neo4j/connection";
import User from "../../entities/User";

interface CreateUserInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default async function createUser(
  source: any,
  args: MutationInput<CreateUserInput>,
  context: any
): Promise<User> {
  const userData = args.input;

  const user = new User();
  try {
    user.username = userData.username;
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    await user.save();

    const session = getSession(context);
    await session.executeWrite((txc) =>
      txc.run(
        "CREATE (user:USER {id: $id, username: $username, fullName: $fullName, email: $email})",
        {
          id: user.id,
          username: user.username,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }
      )
    );
  } catch (err) {
    console.error(err);
    throw err;
  }

  return user;
}
