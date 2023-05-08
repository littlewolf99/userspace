/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import { getSession } from "../../neo4j/connection";
import Post from "../../entities/Post";
import User from "../../entities/User";
import { parseGlobalID } from "../utils/id";
import { createEdge } from "../utils/pagination";

interface CreatePostInput {
  userId: string;
  content: string;
}

export default async function createPost(
  source: unknown,
  args: MutationInput<CreatePostInput>,
  context: any
): Promise<Edge<Post>> {
  const [id] = parseGlobalID(args.input.userId);
  const user = await User.findOneBy({ id });
  if (!user) {
    throw new GraphQLError("User not found");
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

  return createEdge(post, "postedAt");
}
