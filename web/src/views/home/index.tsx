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
import { Typography } from "@mui/material";

const Home = () => {
  const {
    state: { tokens, user },
  } = useContext(AppState);

  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) navigate(AppRoutes.Login);
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
          <StyledColumn flex={5} width={"100%"}>
            <Typography>Home</Typography>
            <Typography>Projects</Typography>
            <Typography>Accounts</Typography>
            <Typography>Other</Typography>
          </StyledColumn>
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
