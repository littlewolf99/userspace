/// <reference types="../../@types/global" />

import { createIDGenerator } from "../utils/id";
import User from "../../entities/User";
import Post from "../../entities/Post";

export default {
  ...createIDGenerator("post"),

  postedAt(post: Post) {
    return post.postedAt.toISOString();
  },

  user: async (source: Post): Promise<User> => {
    return source.user;
  },
};
