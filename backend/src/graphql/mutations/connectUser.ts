/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import Friendship from "../../entities/Friendship";
import User from "../../entities/User";

interface ConnectUserInput {
  id1: number;
  id2: number;
}

interface ConnectUserPayload {
  result: boolean;
}

export default async function connectUser(
  source: unknown,
  args: MutationInput<ConnectUserInput>,
  context: any
): Promise<ConnectUserPayload> {
  const input = args.input;

  const user1 = await User.findOneBy({ id: args.input.id1 });
  if (!user1) {
    throw new GraphQLError("Invalid id specified.");
  }
  const user2 = await User.findOneBy({ id: args.input.id2 });
  if (!user2) {
    throw new GraphQLError("Invalid id specified.");
  }

  let friendships = [new Friendship(), new Friendship()];
  friendships[0].user1 = user1;
  friendships[0].user2 = user2;
  friendships[1].user1 = user2;
  friendships[1].user2 = user1;
  await Promise.all(friendships.map((friendship) => friendship.save()));

  return {
    result: true,
  };
}
