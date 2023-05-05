import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Users from "./Users";
import { useAuth } from "utils/auth";

const Spinner = () => <div>Loading...</div>;

const Failed = (error: any) => <div>Failed to fetch data: {error.message}</div>;

function Dashboard() {
  useAuth();

  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <Users />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
