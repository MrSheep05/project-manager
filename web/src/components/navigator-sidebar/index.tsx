import { useCallback, useContext } from "react";
import { AppState } from "../../hooks/app-state";
import { AppAction } from "../../hooks/app-state/types";
import { Role } from "../../utils/types";
import {
  StyledAccountsIcon,
  StyledButton,
  StyledCategoriesIcon,
  StyledColumn,
  StyledEnd,
  StyledLogoutIcon,
  StyledProjectIcon,
  StyledStatusIcon,
} from "./styled";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/types";
import RouteButton from "./widgets/route-button";

const ADMIN_ROUTES: [AppRoutes, JSX.Element, string][] = [
  [AppRoutes.Accounts, <StyledAccountsIcon />, "Użytkownicy"],
  [AppRoutes.Categories, <StyledCategoriesIcon />, "Kategorie"],
  [AppRoutes.Status, <StyledStatusIcon />, "Statusy"],
];
const NavigationSidebar = () => {
  const {
    dispatch,
    state: { user },
  } = useContext(AppState);

  const logout = useCallback(() => {
    dispatch({ type: AppAction.SaveTokens });
  }, []);

  const navigate = useNavigate();
  //TODO Admin routes
  return (
    <StyledColumn>
      <RouteButton route={AppRoutes.Project} name="Projekty">
        <StyledProjectIcon />
      </RouteButton>
      {(user?.role ?? Role.User) === Role.Admin
        ? ADMIN_ROUTES.map(([route, icon, name]) => (
            <RouteButton name={name} route={route} key={route}>
              {icon}
            </RouteButton>
          ))
        : undefined}
      <StyledEnd>
        <RouteButton name="Wyloguj" onClick={logout}>
          <StyledLogoutIcon />
        </RouteButton>
      </StyledEnd>
    </StyledColumn>
  );
};

export default NavigationSidebar;
