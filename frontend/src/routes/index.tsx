import { createBrowserRouter } from "react-router-dom";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard";
import Signup from "components/Signup";
import Signin from "components/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
