import { createBrowserRouter } from "react-router-dom";
import Layout, { loader as layoutLoader } from "components/Layout";
import Dashboard, { loader as dashboardLoader } from "components/Dashboard";
import Signup from "components/Signup";
import Signin from "components/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
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
