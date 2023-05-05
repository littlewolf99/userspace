import * as React from "react";
import { Avatar, Space, Typography } from "antd";
import { useAuth } from "utils/auth";
import Block from "./common/Block";

const { Text, Paragraph } = Typography;

const UserInfo: React.FC = () => {
  const [user] = useAuth(false);

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

        <Text strong style={{ display: "block", margin: "10px 0 0" }}>
          {[user.firstName, user.lastName].join(" ")}
        </Text>

        <Text type="secondary">@{user.username}</Text>

        <Text type="secondary">{user.email}</Text>
      </Space>
    </Block>
  );
};

export default UserInfo;