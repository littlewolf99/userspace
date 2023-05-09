import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import loader from "utils/queryLoader";

const importLayoutLoader = () => import("components/Layout/loader");
const Layout = React.lazy(() => import("components/Layout"));
const importDashboardLoader = () => import("components/Dashboard/loader");
const Dashboard = React.lazy(() => import("components/Dashboard"));
const Signup = React.lazy(() => import("components/Signup"));
const Signin = React.lazy(() => import("components/Signin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: loader("layout", importLayoutLoader),
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
