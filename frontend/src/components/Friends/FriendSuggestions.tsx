import * as React from "react";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { Button, Space, Typography } from "antd";
import Block from "../common/Block";
import { FriendSuggestionsFragment$key } from "__generated__/FriendSuggestionsFragment.graphql";
import Friend from "./Friend";
import { SidebarQuery } from "__generated__/SidebarQuery.graphql";

const friendSuggestionsFragment = graphql`
  fragment FriendSuggestionsFragment on User
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  )
  @refetchable(queryName: "FriendSuggestionsFragmentPaginationQuery") {
    friendSuggestions(first: $count, after: $cursor)
      @connection(key: "FriendSuggestionsFragmentFragment__friendSuggestions") {
      edges {
        node {
          id
          ...FriendFragment
        }
      }
    }
  }
`;

interface FriendSuggestionsProps {
  user: FriendSuggestionsFragment$key | null;
}

const FriendSuggestions: React.FC<FriendSuggestionsProps> = ({ user }) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    SidebarQuery,
    FriendSuggestionsFragment$key
  >(friendSuggestionsFragment, user);

  return (
    <Block padding={20}>
      {(data?.friendSuggestions?.edges.length || 0) > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text strong style={{ fontSize: "0.9em" }}>
            Suggestions
          </Typography.Text>

          {(data?.friendSuggestions.edges || []).map((userEdge) => (
            <Friend key={userEdge?.node?.id} user={userEdge?.node || null} />
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
          No friends suggested.
        </Typography.Text>
      )}
    </Block>
  );
};

export default FriendSuggestions;
