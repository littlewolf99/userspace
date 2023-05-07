/// <reference types="../../@types/global" />

import { QueryResult, Node } from "neo4j-driver";
import { getSession } from "../../neo4j/connection";
import { In } from "typeorm";
import doPaginate from "../utils/pagination";
import { createIDGenerator } from "../utils/id";
import User from "../../entities/User";
import Post from "../../entities/Post";

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
    context: any
  ): Promise<Connection<UserData>> =>
    doPaginate(
      { args, allowedKeyFields: ["id"] },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        const variables: QueryVariables = {
          id: user.id,
        };
        if (startKey) {
          variables.startKey = startKey;
        }

        const session = getSession(context);
        const where = startKey
          ? ` WHERE friend.${keyField} ${comp} $startKey`
          : "";
        const result = await session.executeRead<
          QueryResult<{
            friend: Node<number, UserData>;
          }>
        >((txc) =>
          txc.run(
            `
            MATCH (user:USER {id: $id})
            MATCH (user)-[:FRIEND]-(friend:USER) ${where}
            RETURN friend ORDER BY friend.${keyField} ${direction}
            LIMIT ${limit + 1}
            `,
            variables
          )
        );
        session.close();

        const users = result.records.map(
          (record) => record.get("friend").properties
        );

        return users;
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
        const variables: QueryVariables = {
          id: user.id,
        };
        if (startKey) {
          variables.startKey = startKey;
        }

        const session = getSession(context);
        const where = startKey
          ? ` WHERE suggestion.${keyField} ${comp} $startKey`
          : "";
        const result = await session.executeRead<
          QueryResult<{
            suggestion: Node<number, UserData>;
          }>
        >((txc) =>
          txc.run(
            `
            MATCH (user:USER {id: $id})
            MATCH (user)-[:FRIEND]-(:USER)-[:FRIEND]-(suggestion:USER)
            ${where}
            RETURN suggestion ORDER BY suggestion.${keyField} ${direction}
            LIMIT ${limit + 1}
            `,
            variables
          )
        );
        session.close();

        const users = result.records.map(
          (record) => record.get("suggestion").properties
        );

        return users;
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
        const variables: QueryVariables = {
          userId: user.id,
        };
        if (startKey) {
          variables.startKey = startKey;
        }

        const session = getSession(context);
        const where = startKey
          ? ` WHERE post.${keyField} ${comp} $startKey`
          : "";
        const result = await session.executeRead<
          QueryResult<{
            post: Node<number, PostData>;
          }>
        >((txc) =>
          txc.run(
            `
            MATCH (user:USER {id: $userId})
            MATCH (user)-[:FRIEND]-(:USER)<-[:POSTED_BY]-(post:POST)
            ${where}
            RETURN post ORDER BY post.${keyField} ${direction}
            LIMIT ${limit + 1}
            `,
            variables
          )
        );
        session.close();

        const postIds = result.records.map(
          (record) => record.get("post").properties.id
        );

        return Post.findBy({
          id: In(postIds),
        });
      }
    ),
};
