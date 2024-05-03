import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login/login-page";
import { Routes } from "./types";

const routerConfig = [
  {
    path: Routes.Login,
    element: <Login />,
  },
  {
    path: "/auth/google",
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
