/// <reference types="../../@types/global" />

import { QueryResult, Node } from "neo4j-driver";
import { getSession } from "../../neo4j/connection";
import User from "../../entities/User";
import doPaginate from "../utils/pagination";

interface UserData {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

export default {
  friends: async (
    user: User,
    args: PaginationParams,
    context: any
  ): Promise<Connection<UserData>> =>
    doPaginate(
      { args },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        const where = startKey
          ? ` WHERE friend.${keyField} ${comp} $startKey`
          : "";

        const variables: QueryVariables = {
          id: user.id,
        };
        if (startKey) {
          variables.startKey = startKey;
        }

        const session = getSession(context);
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
      { args },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        const where = startKey
          ? ` WHERE friend.${keyField} ${comp} $startKey`
          : "";

        const variables: QueryVariables = {
          id: user.id,
        };
        if (startKey) {
          variables.startKey = startKey;
        }

        const session = getSession(context);
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
};
