/// <reference types="../../@types/global" />

import { QueryResult, Node } from "neo4j-driver";
import { getSession } from "../../neo4j/connection";
import { createWhere } from "../../neo4j/db";
import doPaginate from "../utils/pagination";
import { createIDGenerator } from "../utils/id";
import User from "../../entities/User";
import { getPostLoader } from "../dataloaders";

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
        const conditions: string[] = [];
        if (startKey) {
          conditions.push(`friend.${keyField} ${comp} $startKey`);
        }
        const result = await session.executeRead<
          QueryResult<{
            friend: Node<number, UserData>;
          }>
        >((txc) =>
          txc.run(
            [
              "MATCH (user:USER {id: $id})",
              "MATCH (user)-[:FRIEND]-(friend:USER)",
              createWhere(conditions),
              `RETURN friend ORDER BY friend.${keyField} ${direction}`,
              `LIMIT ${limit}`,
            ].join("\n"),
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
        const conditions = ["NOT ((user)-[:FRIEND]-(suggestion:USER))"];
        if (startKey) {
          conditions.push(` suggestion.${keyField} ${comp} $startKey`);
        }
        const result = await session.executeRead<
          QueryResult<{
            suggestion: Node<number, UserData>;
          }>
        >((txc) =>
          txc.run(
            [
              "MATCH (user:USER {id: $id})",
              "MATCH (user)-[:FRIEND]-(:USER)-[:FRIEND]-(suggestion:USER)",
              createWhere(conditions),
              `RETURN DISTINCT suggestion ORDER BY suggestion.${keyField} ${direction}`,
              `LIMIT ${limit}`,
            ].join("\n"),
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
        const conditions: string[] = [];
        if (startKey) {
          conditions.push(`post.${keyField} ${comp} $startKey`);
        }
        const result = await session.executeRead<
          QueryResult<{
            post: Node<number, PostData>;
          }>
        >((txc) =>
          txc.run(
            [
              "MATCH (user:USER {id: $userId})",
              "MATCH (user)-[:FRIEND*0..1]-(:USER)<-[:POSTED_BY]-(post:POST)",
              createWhere(conditions),
              `RETURN post ORDER BY post.${keyField} ${direction}`,
              `LIMIT ${limit}`,
            ].join("\n"),
            variables
          )
        );
        session.close();

        const postLoader = getPostLoader(session);
        const postIds = result.records.map(
          (record) => record.get("post").properties.id
        );
        return Promise.all(postIds.map((id) => postLoader.load(id)));
      }
    ),
};
