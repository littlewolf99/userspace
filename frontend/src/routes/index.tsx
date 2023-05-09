import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import loader from "utils/queryLoader";
import Failed from "components/common/Failed";

const importLayoutLoader = () => import("components/Layout/loader");
const Layout = React.lazy(() => import("components/Layout"));
const importDashboardLoader = () => import("components/Dashboard/loader");
const Dashboard = React.lazy(() => import("components/Dashboard"));
const Signup = React.lazy(() => import("components/Signup"));
const Signin = React.lazy(() => import("components/Signin"));

const ErrorBoundary = () => <ReactErrorBoundary FallbackComponent={Failed} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: loader("layout", importLayoutLoader),
    ErrorBoundary,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: loader("dashboard", importDashboardLoader),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
