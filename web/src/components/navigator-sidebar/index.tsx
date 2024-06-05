import { useCallback, useContext } from "react";
import { AppState } from "../../hooks/app-state";
import { AppAction } from "../../hooks/app-state/types";
import { StyledColumn } from "../../views/home/styled";
import { Role } from "../../utils/types";

const NavigatorSidebar = () => {
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
    </StyledColumn>
  );
};
