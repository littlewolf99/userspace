/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import Post from "../../entities/Post";
import { createEdge } from "../utils/pagination";
import { GraphQLContext } from "../../auth";
import pubSub from "../pubsub";

interface CreatePostInput {
  userId: string;
  content: string;
}

export default async function createPost(
  source: unknown,
  args: MutationInput<CreatePostInput>,
  context: GraphQLContext
): Promise<Edge<Post>> {
  const user = context.currentUser;
  if (!user) {
    throw new GraphQLError("Not authenticated. Please log in to create post.");
  }

  const post = new Post();
  post.content = args.input.content;
  post.postedAt = new Date();
  post.user = user;
  await post.save();

  const postEdge = createEdge(post, "postedAt");
  pubSub.publish("postCreated", postEdge);

  return postEdge;
}
