import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { Space } from "antd";
import { FeedFragment$key } from "__generated__/FeedFragment.graphql";
import FeedItem from "./FeedItem";

const feedFragment = graphql`
  fragment FeedFragment on User {
    feed(first: 3) {
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
  const data = useFragment<FeedFragment$key>(feedFragment, props.user);

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      {(data.feed.edges || []).map((postEdge) => (
        <FeedItem key={postEdge?.node?.id} post={postEdge?.node || null} />
      ))}
    </Space>
  );
};

export default Feed;
