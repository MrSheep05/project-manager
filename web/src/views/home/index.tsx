import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppState } from "../../hooks/app-state";
import { AppRoutes } from "../../routes/types";
import { WebsocketStateComponent } from "../../hooks/websocket";
import { StyledContainer } from "../../components/loading/styled";
import {
  StyledAvatar,
  StyledContent,
  StyledHeader,
  StyledRow,
  StyledSidebar,
} from "./styled";

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
            <StyledAvatar src={user?.picture} />
          </StyledHeader>
          <Outlet />
        </StyledContent>
      </StyledRow>
    </WebsocketStateComponent>
  );
};

export default Home;
