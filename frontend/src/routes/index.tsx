import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import loader from "utils/queryLoader";
import layoutLoader from "components/Layout/loader";
import dashboardLoader from "components/Dashboard/loader";
import Failed from "components/common/Failed";
// Layout can be included in the main bundle as it is used in all pages
import Layout from "components/Layout";

const Dashboard = React.lazy(() => import("components/Dashboard"));
const Signup = React.lazy(() => import("components/Signup"));
const Signin = React.lazy(() => import("components/Signin"));

const ErrorBoundary = () => <ReactErrorBoundary FallbackComponent={Failed} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: loader("layout", layoutLoader),
    ErrorBoundary,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: loader("dashboard", dashboardLoader),
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
