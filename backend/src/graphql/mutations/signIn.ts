/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../../entities/User";
import config from "../../config";

interface SignInInput {
  username: string;
  password: string;
}

interface SignInPayload {
  user: User;
  token: string;
}

export default async function signIn(
  source: unknown,
  args: MutationInput<SignInInput>
): Promise<SignInPayload> {
  const signInData = args.input;

  const user = await User.findOne({
    where: {
      username: signInData.username,
    },
  });

  if (!user) {
    throw new GraphQLError("Username or password is not correct.");
  }

  const valid = await compare(signInData.password, user.password);
  if (!valid) {
    throw new GraphQLError("Username or password is not correct.");
  }

  const token = sign({ userId: user.id }, config.appSecret);

  return { user, token };
}
