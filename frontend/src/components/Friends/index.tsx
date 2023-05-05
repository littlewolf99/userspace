import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { Space, Typography } from "antd";
import Block from "../common/Block";
import Friend from "./Friend";
import { FriendsFragment$key } from "__generated__/FriendsFragment.graphql";

const friendsFragment = graphql`
  fragment FriendsFragment on User {
    friends {
      id @required(action: NONE)
      ...FriendFragment
    }
  }
`;

interface FriendsProps {
  user: FriendsFragment$key | null;
}

const Friends: React.FC<FriendsProps> = (props) => {
  const data = useFragment<FriendsFragment$key>(friendsFragment, props.user);

  return (
    <Block padding={20}>
      {data?.friends?.length || 0 > 0 ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text strong style={{ fontSize: "0.9em" }}>
            Your Friends
          </Typography.Text>

          {(data?.friends || []).map((friend) => (
            <Friend key={friend?.id} user={friend} />
          ))}
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
