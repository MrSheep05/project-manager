import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppState } from "../../hooks/app-state";
import { AppRoutes } from "../../routes/types";
import { WebsocketStateComponent } from "../../hooks/websocket";
import { StyledText } from "../../components/loading/styled";
import {
  StyledAvatar,
  StyledColumn,
  StyledContent,
  StyledRow,
  StyledSidebar,
} from "./styled";
import PermissionBracet from "../../components/permission-bracet";
import ReconnectWidget from "./widgets/reconnect";
import { getTokens } from "../../utils";
import { AppAction } from "../../hooks/app-state/types";
import NavigationSidebar from "../../components/navigator-sidebar";

const Home = () => {
  const {
    state: { tokens, user },
    dispatch,
  } = useContext(AppState);

  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      const newTokens = getTokens();
      if (!newTokens) return navigate(AppRoutes.Login);
      dispatch({ type: AppAction.SaveTokens, payload: newTokens });
    }
  }, [tokens]);

  return (
    <WebsocketStateComponent>
      <StyledRow height={"100%"}>
        <StyledSidebar>
          <StyledRow flex={1}>
            <StyledAvatar src={user?.picture} />
            <StyledColumn alignItems={"start !important"}>
              <StyledText>{user?.name}</StyledText>
              <StyledText>{user?.email}</StyledText>
              <PermissionBracet role={user?.role}></PermissionBracet>
            </StyledColumn>
          </StyledRow>

          <NavigationSidebar />
        </StyledSidebar>
        <StyledContent>
          <ReconnectWidget user={user}>
            <Outlet />
          </ReconnectWidget>
        </StyledContent>
      </StyledRow>
    </WebsocketStateComponent>
  );
};

export default Home;
