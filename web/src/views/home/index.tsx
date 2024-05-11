import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppState } from "../../hooks/app-state";
import { AppRoutes } from "../../routes/types";
import { WebsocketStateComponent } from "../../hooks/websocket";
import { StyledContainer, StyledText } from "../../components/loading/styled";
import {
  StyledAvatar,
  StyledColumn,
  StyledContent,
  StyledHeader,
  StyledRow,
  StyledSidebar,
} from "./styled";
import PermissionBracet from "../../components/permission-bracet";

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
        <StyledContent>
          <StyledHeader>
            <StyledColumn>
              <StyledText>{user?.name}</StyledText>
              <StyledText>{user?.email}</StyledText>
              <PermissionBracet role={user?.role}></PermissionBracet>
            </StyledColumn>
            <StyledAvatar src={user?.picture} />
          </StyledHeader>
          <Outlet />
        </StyledContent>
      </StyledRow>
    </WebsocketStateComponent>
  );
};

export default Home;
