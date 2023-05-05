import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { Avatar, Space, Typography } from "antd";
import { FriendFragment$key } from "__generated__/FriendFragment.graphql";

const friendFragment = graphql`
  fragment FriendFragment on User {
    id @required(action: NONE)
    username @required(action: NONE)
    email @required(action: NONE)
    firstName @required(action: NONE)
    lastName @required(action: NONE)
  }
`;

interface FriendProps {
  user: FriendFragment$key | null;
}

const Friend: React.FC<FriendProps> = (props) => {
  const data = useFragment<FriendFragment$key>(friendFragment, props.user);

  if (!data) {
    return null;
  }

  const initials = (data.firstName[0] + data.lastName[0]).toUpperCase();

  const fullName = [data.firstName, data.lastName].join(" ");

  return (
    <Space direction="horizontal" style={{ width: "100%" }} size={10}>
      <Avatar style={{ backgroundColor: "#1890ff" }}>{initials}</Avatar>

      <Typography.Text style={{ fontSize: "0.9em" }}>
        {fullName}
      </Typography.Text>
    </Space>
  );
};

export default Friend;
