/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../auth";
import doPaginate from "../utils/pagination";
import { createIDGenerator } from "../utils/id";
import { getPostLoader } from "../dataloaders";
import User from "../../entities/User";
import Friendship from "../../entities/Friendship";
import { And, In } from "typeorm";

interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface PostData {
  id: number;
  content: string;
  user: UserData;
}

export default {
  ...createIDGenerator("user"),

  friends: async (
    user: User,
    args: PaginationParams,
    context: GraphQLContext
  ): Promise<Connection<UserData>> =>
    doPaginate(
      { args, allowedKeyFields: ["id"] },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        const user = context.currentUser;
        if (!user) {
          throw new GraphQLError("Not authorized.");
        }

        let query = User.createQueryBuilder()
          .where((qb) => {
            const subQuery = qb
              .subQuery()
              .select("f.user1Id")
              .from("Friendship", "f")
              .where("f.user2 = :id")
              .getQuery();
            return "id IN " + subQuery;
          })
          .setParameter("id", user.id)
          .orderBy(keyField, direction)
          .limit(limit);

        if (startKey) {
          query = query
            .where(`${keyField} ${comp} :startKey`)
            .setParameter("startKey", startKey);
        }

        return query.getMany();
      }
    ),

  friendSuggestions: async (
    user: User,
    args: PaginationParams,
    context: any
  ): Promise<Connection<UserData>> =>
    doPaginate(
      { args, allowedKeyFields: ["id"] },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        // TODO: implement on SQL-only version
        return [];
      }
    ),

  feed: async (
    user: User,
    args: PaginationParams,
    context: any
  ): Promise<Connection<PostData>> =>
    doPaginate(
      { args, allowedKeyFields: ["postedAt"], isAscendingForward: false },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        // const variables: QueryVariables = {
        //   userId: user.id,
        // };
        // if (startKey) {
        //   variables.startKey = startKey;
        // }

        // const session = getSession(context);
        // const conditions: string[] = [];
        // if (startKey) {
        //   conditions.push(`post.${keyField} ${comp} $startKey`);
        // }
        // const result = await session.executeRead<
        //   QueryResult<{
        //     post: Node<number, PostData>;
        //   }>
        // >((txc) =>
        //   txc.run(
        //     [
        //       "MATCH (user:USER {id: $userId})",
        //       "MATCH (user)-[:FRIEND*0..1]-(:USER)<-[:POSTED_BY]-(post:POST)",
        //       createWhere(conditions),
        //       `RETURN post ORDER BY post.${keyField} ${direction}`,
        //       `LIMIT ${limit}`,
        //     ].join("\n"),
        //     variables
        //   )
        // );
        // session.close();

        // const postLoader = getPostLoader(session);
        // const postIds = result.records.map(
        //   (record) => record.get("post").properties.id
        // );
        // return Promise.all(postIds.map((id) => postLoader.load(id)));
        return [];
      }
    ),
};
