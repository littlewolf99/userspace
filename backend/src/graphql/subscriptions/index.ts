import pubSub, { PossibleSubscriptions } from "../pubsub";

type Subscription = {
  [key in keyof PossibleSubscriptions]: any;
};

const subscription: Subscription = {
  postCreated: {
    subscribe: () => pubSub.subscribe("postCreated"),
    resolve: (payload: any) => payload,
  },
};

export default subscription;
