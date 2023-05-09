import { ConnectionHandler, graphql, useSubscription } from "react-relay";
import { PostCreatedSubscription } from "__generated__/PostCreatedSubscription.graphql";

const postCreatedSubscription = graphql`
  subscription PostCreatedSubscription($connections: [ID!]!) {
    postCreated @prependEdge(connections: $connections) {
      cursor
      node {
        ...FeedItemFragment
      }
    }
  }
`;

export default function usePostCreatedSubscription(feedParentIds: string[]) {
  const connectionIds = feedParentIds.map((pid) =>
    ConnectionHandler.getConnectionID(pid, "FeedFragment__feed")
  );

  return useSubscription<PostCreatedSubscription>({
    subscription: postCreatedSubscription,
    variables: {
      connections: connectionIds,
    },
  });
}
