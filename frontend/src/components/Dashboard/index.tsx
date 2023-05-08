import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "utils/auth";
import Failed from "components/common/Failed";
import Spinner from "components/common/Spinner";
import DashboardContainer from "./DashboardContainer";

function Dashboard() {
  useAuth();

  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <DashboardContainer />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
