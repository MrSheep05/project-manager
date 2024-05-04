import Login from "../views/login";
import Home from "../views/home";
import { AppRoutes } from "./types";
import {
  Route,
  RouteObject,
  MemoryRouter as Router,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { AppStateComponent } from "../hooks/app-state";
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
  { path: "/auth/google" },
  { path: "*", element: <Redirect path={AppRoutes.Project} /> },
];

const router = createBrowserRouter(routerConfig);

// export const MainRouter = () => {
//   return (
//     <Router>
//       <AppStateComponent>
//         <Routes>
//           <Route path={AppRoutes.Login} element={<Login />} />
//           <Route path={AppRoutes.Home} element={<Home />}>
//             <Route index element={<Projects />} />
//           </Route>
//           <Route path="*" element={<Redirect />} />
//         </Routes>
//       </AppStateComponent>
//     </Router>
//   );
// };
export default router;
