import { createPubSub } from "graphql-yoga";
import Post from "../entities/Post";

export type PossibleSubscriptions = {
  postCreated: [Edge<Post>];
};

const pubSub = createPubSub<PossibleSubscriptions>();

export default pubSub;
