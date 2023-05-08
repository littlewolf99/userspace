import * as React from "react";
import { PreloadedQuery, loadQuery } from "react-relay";
import { useLoaderData } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "utils/auth";
import Failed from "components/common/Failed";
import Spinner from "components/common/Spinner";
import DashboardContainer, {
  dashboardContainerQuery,
} from "./DashboardContainer";
import { RelayEnvironment } from "RelayEnvironment";
import { DashboardContainerQuery } from "__generated__/DashboardContainerQuery.graphql";

export const loader = async () => {
  return loadQuery(RelayEnvironment, dashboardContainerQuery, {});
};

function Dashboard() {
  const queryRef = useLoaderData() as PreloadedQuery<DashboardContainerQuery>;
  useAuth();

  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <DashboardContainer queryRef={queryRef} />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
