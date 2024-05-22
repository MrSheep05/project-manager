import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppState } from "../../hooks/app-state";
import { AppRoutes } from "../../routes/types";
import { WebsocketState, WebsocketStateComponent } from "../../hooks/websocket";
import { StyledText } from "../../components/loading/styled";
import {
  StyledAvatar,
  StyledColumn,
  StyledContent,
  StyledHeader,
  StyledRow,
  StyledSidebar,
} from "./styled";
import PermissionBracet from "../../components/permission-bracet";
import ReconnectWidget from "./widgets/reconnect";
import AddProject from "./widgets/addProject";

const Home = () => {
  const {
    state: { tokens, user },
  } = useContext(AppState);

  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      console.log("GO LOGIN", Date.now());

      navigate(AppRoutes.Login);
    }
  }, [tokens]);

  return (
    <WebsocketStateComponent>
      <StyledRow>
        <StyledSidebar>Home</StyledSidebar>
        <AddProject></AddProject>
        <StyledContent>
          <StyledHeader>
            <StyledColumn>
              <StyledText>{user?.name}</StyledText>
              <StyledText>{user?.email}</StyledText>
              <PermissionBracet role={user?.role}></PermissionBracet>
            </StyledColumn>
            <StyledAvatar src={user?.picture} />
          </StyledHeader>

          <ReconnectWidget user={user}>
            <Outlet />
          </ReconnectWidget>
        </StyledContent>
      </StyledRow>
    </WebsocketStateComponent>
  );
};

export default Home;
