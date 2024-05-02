import { createBrowserRouter } from "react-router-dom";
import Login from "./login-page";

const routerConfig = [
    {
        path: "/oauth2callback",
        element: <Login />
    },
    {
        path: "/auth/google"
    }
];
  
const router = createBrowserRouter(routerConfig);

export default router;