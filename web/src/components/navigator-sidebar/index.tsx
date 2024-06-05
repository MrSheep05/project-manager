import { useCallback, useContext } from "react";
import { AppState } from "../../hooks/app-state";
import { AppAction } from "../../hooks/app-state/types";
import { Role } from "../../utils/types";
import {
  StyledButton,
  StyledColumn,
  StyledEnd,
  StyledLogoutIcon,
} from "./styled";
import { Box, Typography } from "@mui/material";

const NavigationSidebar = () => {
  const {
    dispatch,
    state: { user },
  } = useContext(AppState);

  const logout = useCallback(() => {
    dispatch({ type: AppAction.SaveTokens });
  }, []);

  //TODO Admin routes
  return (
    <StyledColumn>
      {(user?.role ?? Role.User) === Role.Admin ? undefined : undefined}
      <StyledEnd>
        <StyledButton onClick={logout}>
          <StyledLogoutIcon />
          <Typography width={"100%"}>Wyloguj</Typography>
        </StyledButton>
      </StyledEnd>
    </StyledColumn>
  );
};

export default NavigationSidebar;
