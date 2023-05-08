import { BaseEntity } from "typeorm";
import { parseGlobalID } from "../utils/id";
import Post from "../../entities/Post";
import User from "../../entities/User";
import { GraphQLContext } from "../../auth";

export default {
  node: async (source: any, args: { id: string }) => {
    const [id, model] = parseGlobalID(args.id);
    let Model: any = null;

    if (model === "user") {
      Model = User;
    } else if (model === "post") {
      Model = Post;
    } else {
      throw new Error("Invalid ID specified");
    }

    return Model.findOne({ where: { id } });
  },

  users: async () => User.find(),

  user: async (source: any, args: { id: string }) => {
    const [id] = parseGlobalID(args.id);
    if (!id) {
      return null;
    }
    return User.findOne({ where: { id } });
  },

  currentUser: async (source: any, args: any, context: GraphQLContext) =>
    context.currentUser,
};
