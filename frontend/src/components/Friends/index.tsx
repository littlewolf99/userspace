import * as React from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { Button, Space, Typography } from "antd";
import Block from "../common/Block";
import Friend from "./Friend";
import { FriendsFragment$key } from "__generated__/FriendsFragment.graphql";
import { SidebarQuery } from "__generated__/SidebarQuery.graphql";

const friendsFragment = graphql`
  fragment FriendsFragment on User
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  )
  @refetchable(queryName: "FriendsFragmentPaginationQuery") {
    friends(first: $count, after: $cursor)
      @connection(key: "FriendsFragment__friends") {
      edges {
        node {
          id
          ...FriendFragment
        }
      }
    }
  }
`;

interface FriendsProps {
  user: FriendsFragment$key | null;
}

const Friends: React.FC<FriendsProps> = (props) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    SidebarQuery,
    FriendsFragment$key
  >(friendsFragment, props.user);

  return (
    <Block padding={20}>
      {(data?.friends?.edges.length || 0) > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text strong style={{ fontSize: "0.9em" }}>
            Your Friends
          </Typography.Text>

          {(data?.friends.edges || []).map((friendEdge) => (
            <Friend
              key={friendEdge?.node?.id}
              user={friendEdge?.node || null}
            />
          ))}

          {hasNext && (
            <div style={{ marginTop: 5, textAlign: "center" }}>
              <Button
                type="primary"
                size="small"
                onClick={() => loadNext(3)}
                disabled={isLoadingNext}
              >
                Load more...
              </Button>
            </div>
          )}
        </Space>
      ) : (
        <Typography.Text style={{ fontSize: "0.9em" }}>
          You have no friends yet.
        </Typography.Text>
      )}
    </Block>
  );
};

export default Friends;
