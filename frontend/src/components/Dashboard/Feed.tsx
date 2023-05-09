import * as React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { Button, Space } from "antd";
import { FeedFragment$key } from "__generated__/FeedFragment.graphql";
import PostCreate from "./PostCreate";
import FeedItem from "./FeedItem";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";
import usePostCreatedSubscription from "subscriptions/PostCreated";

const pageSize = 10;

const feedFragment = graphql`
  fragment FeedFragment on User
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 10 }
  )
  @refetchable(queryName: "FeedFragmentPaginationQuery") {
    feed(first: $count, after: $cursor) @connection(key: "FeedFragment__feed") {
      edges {
        node {
          id
          ...FeedItemFragment
        }
      }
    }
  }
`;

interface FeedProps {
  user: FeedFragment$key;
}

const Feed: React.FC<FeedProps> = (props) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    DashboardContainerQuery,
    FeedFragment$key
  >(feedFragment, props.user);

  usePostCreatedSubscription([data.id]);

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <PostCreate />

      {(data.feed.edges || []).map((postEdge) => (
        <FeedItem key={postEdge?.node?.id} post={postEdge?.node || null} />
      ))}

      {hasNext && (
        <div style={{ marginTop: 5, textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => loadNext(pageSize)}
            disabled={isLoadingNext}
          >
            {isLoadingNext ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </Space>
  );
};

export default Feed;
