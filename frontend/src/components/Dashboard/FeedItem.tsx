import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { graphql, useFragment } from "react-relay";
import Block from "components/common/Block";
import { FeedItemFragment$key } from "__generated__/FeedItemFragment.graphql";
import { Avatar, Space, Typography } from "antd";

const feeditemFragment = graphql`
  fragment FeedItemFragment on Post {
    id
    content
    postedAt
    user {
      id
      username
      firstName
      lastName
    }
  }
`;

interface FeedItemProps {
  post: FeedItemFragment$key | null;
}

const FeedItem: React.FC<FeedItemProps> = (props) => {
  const data = useFragment<FeedItemFragment$key>(feeditemFragment, props.post);

  if (!data) {
    return null;
  }

  const fullName = [data.user.firstName, data.user.lastName].join(" ");

  return (
    <>
      <Block padding={15}>{data.content}</Block>

      <Block padding={10} style={{ borderTop: "1px solid #e0e0e1" }}>
        <Space direction="horizontal" style={{ width: "100%" }} size={5}>
          <Avatar size={20} style={{ backgroundColor: "#00CC00" }}>
            <UserOutlined />
          </Avatar>

          <Typography.Text style={{ fontSize: "0.9em" }}>
            {fullName}
          </Typography.Text>
        </Space>
      </Block>
    </>
  );
};

export default FeedItem;
