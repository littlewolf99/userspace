/// <reference types="../../@types/global" />

import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../auth";
import doPaginate from "../utils/pagination";
import { createIDGenerator } from "../utils/id";
import User from "../../entities/User";
import Friendship from "../../entities/Friendship";
import Post from "../../entities/Post";
import { In, LessThan, MoreThan } from "typeorm";

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
        if (!context.currentUser || context.currentUser.id !== user.id) {
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
    context: GraphQLContext
  ): Promise<Connection<PostData>> =>
    doPaginate(
      { args, allowedKeyFields: ["postedAt"], isAscendingForward: false },
      async (isForward, keyField, startKey, direction, comp, limit) => {
        if (!context.currentUser || context.currentUser.id !== user.id) {
          throw new GraphQLError("Not authorized.");
        }

        const friendShips = await Friendship.findBy({
          user2: { id: user.id },
        });

        const ids = [user.id].concat(
          friendShips.map((friendship) => friendship.user1.id)
        );
        const where: { [key: string]: any } = {
          user: { id: In(ids) },
        };
        if (startKey) {
          const op = comp == ">" ? MoreThan : LessThan;
          where[keyField] = op(startKey);
        }

        const posts = await Post.find({
          where,
          take: limit,
          order: {
            [keyField]: direction,
          },
        });

        return posts;
      }
    ),
};
