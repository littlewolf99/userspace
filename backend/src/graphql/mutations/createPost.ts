/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import { getSession } from "../../neo4j/connection";
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

  const session = getSession(context);
  await session.executeWrite((txc) =>
    txc.run(
      `
      MATCH (user:USER {id: $userId})
      CREATE (post:POST {id: $id, userId: $userId, postedAt: $postedAt})
      MERGE (post)-[r:POSTED_BY]->(user)
      `,
      {
        id: post.id,
        userId: user.id,
        postedAt: post.postedAt.toISOString(),
      }
    )
  );

  const postEdge = createEdge(post, "postedAt");
  pubSub.publish("postCreated", postEdge);

  return postEdge;
}
