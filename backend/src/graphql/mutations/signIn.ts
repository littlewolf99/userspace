/// <reference types="../../@types/global" />

import { getSession } from "../../neo4j/connection";
import User from "../../entities/User";

interface SignInInput {
  username: string;
  password: string;
}

interface SignInPayload {
  user: User;
  token: string;
}

export default async function signIn(
  source: any,
  args: MutationInput<SignInInput>
): Promise<SignInPayload> {
  const signInData = args.input;

  const user = await User.findOne({
    where: {
      username: signInData.username,
    },
  });

  if (!user) {
    throw new Error("Failed to login");
  }

  return { user, token: "" };
}
