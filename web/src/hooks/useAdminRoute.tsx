import { useContext, useEffect } from "react";
import { AppState } from "./app-state";
import { Role } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes/types";

const useAdminRoute = () => {
  const { state } = useContext(AppState);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.user?.role !== Role.Admin) {
      navigate(AppRoutes.Project);
    }
  }, [state]);
};

export default useAdminRoute;
