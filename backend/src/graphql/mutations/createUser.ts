/// <reference types="../../@types/global" />

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
  user.username = userData.username;
  user.email = userData.email;
  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.password = await hash(userData.password, 10);
  await user.save();

  return createEdge(user, "id");
}
