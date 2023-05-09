import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { Avatar, Space, Typography } from "antd";
import Block from "../common/Block";
import { UserInfoFragment$key } from "__generated__/UserInfoFragment.graphql";

const userInfoFragment = graphql`
  fragment UserInfoFragment on User {
    username @required(action: NONE)
    email @required(action: NONE)
    firstName @required(action: NONE)
    lastName @required(action: NONE)
  }
`;

interface UserInfoProps {
  user: UserInfoFragment$key | null;
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const user = useFragment<UserInfoFragment$key>(userInfoFragment, props.user);

  if (!user) {
    return null;
  }

  const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();

  return (
    <Block>
      <Space
        direction="vertical"
        style={{ textAlign: "center", width: "100%" }}
        size={0}
      >
        <Avatar
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          size={50}
        >
          {initials}
        </Avatar>

        <Typography.Text
          strong
          style={{ display: "block", margin: "10px 0 0" }}
        >
          {[user.firstName, user.lastName].join(" ")}
        </Typography.Text>

        <Typography.Text type="secondary">@{user.username}</Typography.Text>

        <Typography.Text type="secondary">{user.email}</Typography.Text>
      </Space>
    </Block>
  );
};

export default UserInfo;
