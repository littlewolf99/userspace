import * as React from "react";
import { PreloadedQuery, graphql, usePreloadedQuery } from "react-relay";
import { Space } from "antd";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";
import PostCreate from "./PostCreate";
import Feed from "./Feed";

export const dashboardContainerQuery = graphql`
  query DashboardContainerQuery {
    currentUser @required(action: NONE) {
      ...FeedFragment
      ...PostCreateFragment
    }
  }
`;

interface DashboardContainerProps {
  queryRef: PreloadedQuery<DashboardContainerQuery>;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  queryRef,
}) => {
  const data = usePreloadedQuery(dashboardContainerQuery, queryRef);

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
