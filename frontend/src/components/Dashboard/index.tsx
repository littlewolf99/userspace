import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Categories from "./Categories";

const Spinner = () => <div>Loading...</div>;

const Failed = (error: any) => <div>Failed to fetch data: {error.message}</div>;

const siderStyle = {
  backgroundColor: "#fff",
  padding: "10px",
};

const contentStyle = {
  backgroundColor: "#fff",
  padding: "15px",
};

function Dashboard() {
  return (
    <ErrorBoundary FallbackComponent={Failed}>
      <React.Suspense fallback={<Spinner />}>
        <Categories />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default Dashboard;
