import * as React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { Space } from "antd";
import { FeedFragment$key } from "__generated__/FeedFragment.graphql";
import PostCreate from "./PostCreate";
import FeedItem from "./FeedItem";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";

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

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <PostCreate feedConnectionId={data.id} />

      {(data.feed.edges || []).map((postEdge) => (
        <FeedItem key={postEdge?.node?.id} post={postEdge?.node || null} />
      ))}

      {hasNext && (
        <button disabled={isLoadingNext} onClick={() => loadNext(pageSize)}>
          {isLoadingNext ? "Loading..." : "Load more"}
        </button>
      )}
    </Space>
  );
};

export default Feed;
