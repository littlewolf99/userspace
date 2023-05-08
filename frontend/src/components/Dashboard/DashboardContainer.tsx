import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Space } from "antd";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";
import PostCreate from "./PostCreate";
import Feed from "./Feed";

const dashboardContainerQuery = graphql`
  query DashboardContainerQuery {
    currentUser @required(action: NONE) {
      ...FeedFragment
      ...PostCreateFragment
    }
  }
`;

const DashboardContainer: React.FC = () => {
  const data = useLazyLoadQuery<DashboardContainerQuery>(
    dashboardContainerQuery,
    {}
  );

  if (!data) {
    return null;
  }

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <PostCreate user={data.currentUser} />

      <Feed user={data.currentUser} />
    </Space>
  );
};

export default DashboardContainer;
