import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Dashboard } from "./Pages/Dashboard";
import { NewCar } from "./Pages/Dashboard/New";
import { Layout } from "./Components/Layout";
import { Error } from "./Pages/Error";
import { Private } from "./Components/Private";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "dashboard/new",
        element: (
          <Private>
            <NewCar />
          </Private>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default Router;
