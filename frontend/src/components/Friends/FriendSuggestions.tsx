import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { Space, Typography } from "antd";
import Block from "../common/Block";
import { FriendSuggestionsFragment$key } from "__generated__/FriendSuggestionsFragment.graphql";
import Friend from "./Friend";

const friendSuggestionsFragment = graphql`
  fragment FriendSuggestionsFragment on User {
    friendSuggestions(first: 3) {
      edges {
        node {
          id @required(action: NONE)
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
  const data = useFragment<FriendSuggestionsFragment$key>(
    friendSuggestionsFragment,
    user
  );

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
