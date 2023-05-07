import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Space } from "antd";
import { User } from "utils/auth";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";
import PostCreate from "./PostCreate";
import Feed from "./Feed";

const dashboardContainerQuery = graphql`
  query DashboardContainerQuery($id: ID!) {
    user(id: $id) @required(action: NONE) {
      ...FeedFragment
    }
  }
`;

interface DashboardContainerProps {
  user: User;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ user }) => {
  const data = useLazyLoadQuery<DashboardContainerQuery>(
    dashboardContainerQuery,
    { id: user.id }
  );

  if (!data) {
    return null;
  }

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <PostCreate user={user} />

      <Feed user={data.user} />
    </Space>
  );
};

export default DashboardContainer;
