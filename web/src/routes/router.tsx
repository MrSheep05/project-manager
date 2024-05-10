import Login from "../views/login";
import Home from "../views/home";
import { AppRoutes } from "./types";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import Projects from "../views/projects";
import Redirect from "./redirect";

const routerConfig: RouteObject[] = [
  {
    path: AppRoutes.Login,
    element: <Login />,
  },
  {
    path: AppRoutes.Home,
    element: <Home />,
    children: [
      { path: AppRoutes.Project, element: <Projects />, index: true },
      {
        path: `*`,
        element: <Redirect path={AppRoutes.Project} />,
      },
    ],
  },
  { path: "*", element: <Redirect path={AppRoutes.Project} /> },
];

const router = createBrowserRouter(routerConfig);

export default router;
