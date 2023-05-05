import { createBrowserRouter } from "react-router-dom";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard";
import Signup from "components/Signup";

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
    ],
  },
]);

export default router;
