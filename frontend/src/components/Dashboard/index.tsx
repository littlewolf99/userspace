import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Failed from "components/common/Failed";
import Spinner from "components/common/Spinner";
import Block from "components/common/Block";
import Users from "./Users";
import { useAuth } from "utils/auth";

function Dashboard() {
  useAuth();

  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <Block>
          <Users />
        </Block>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
