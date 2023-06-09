/// <reference types="../../@types/global" />

import { getSession } from "../../neo4j/connection";
import User from "../../entities/User";
import { createEdge } from "../utils/pagination";
import { hash } from "bcryptjs";

interface CreateUserInput {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default async function createUser(
  source: unknown,
  args: MutationInput<CreateUserInput>,
  context: any
): Promise<Edge<User>> {
  const userData = args.input;

  const user = new User();
  try {
    user.username = userData.username;
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.password = await hash(userData.password, 10);
    await user.save();

    const session = getSession(context);
    await session.executeWrite((txc) =>
      txc.run(
        "CREATE (user:USER {id: $id, username: $username, firstName: $firstName, lastName: $lastName, email: $email})",
        {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      )
    );
  } catch (err) {
    console.error(err);
    throw err;
  }

  return createEdge(user, "id");
}
