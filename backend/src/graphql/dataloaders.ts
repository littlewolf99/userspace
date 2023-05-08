import DataLoader from "dataloader";
import Post from "../entities/Post";
import { In } from "typeorm";

export const getPostLoader = (context: any): DataLoader<number, Post> => {
  if (!context.postLoader) {
    context.postLoader = new DataLoader<number, Post>(
      async (ids: readonly number[]) => {
        const posts = await Post.findBy({ id: In(ids) });
        const postMap: { [key: number]: Post } = {};
        posts.forEach((post) => {
          postMap[post.id] = post;
        });
        return ids.map((id) => postMap[id]);
      }
    );
  }

  return context.postLoader;
};
