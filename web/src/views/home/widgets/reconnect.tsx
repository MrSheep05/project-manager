import { Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { WebsocketState } from "../../../hooks/websocket";
import { ReconnectWidgetProps } from "./types";
import Loading from "../../../components/loading";
import { StyledButton, StyledContainer } from "./styled";

const ReconnectWidget = ({ children, user }: ReconnectWidgetProps) => {
  const { send, isAvailable } = useContext(WebsocketState);
  useEffect(() => {
    console.log(isAvailable);
  }, [isAvailable]);
  return (
    <StyledContainer>
      {isAvailable ? (
        !user ? (
          <Loading message={"Getting user data..."} />
        ) : user?.enabled ?? false ? (
          <>{children}</>
        ) : !isAvailable ? (
          <StyledContainer>
            <Typography>Your account is disabled, try again</Typography>
            <StyledButton onClick={() => send("reconnect")}>
              Try again
            </StyledButton>
          </StyledContainer>
        ) : (
          <Loading message={"Reconnecting..."} />
        )
      ) : (
        <Loading message={"Connecting..."} />
      )}
    </StyledContainer>
  );
};

export default ReconnectWidget;
