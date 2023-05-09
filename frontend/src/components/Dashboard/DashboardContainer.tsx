import * as React from "react";
import { PreloadedQuery, graphql, usePreloadedQuery } from "react-relay";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";
import Feed from "./Feed";

export const dashboardContainerQuery = graphql`
  query DashboardContainerQuery {
    currentUser @required(action: NONE) {
      ...FeedFragment
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

  return <Feed user={data.currentUser} />;
};

export default DashboardContainer;
