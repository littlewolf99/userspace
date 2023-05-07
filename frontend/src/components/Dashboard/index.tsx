import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "utils/auth";
import Failed from "components/common/Failed";
import Spinner from "components/common/Spinner";
import DashboardContainer from "./DashboardContainer";

function Dashboard() {
  const [user] = useAuth();

  if (!user) {
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <DashboardContainer user={user} />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
