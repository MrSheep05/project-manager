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

  const isUserEnabled = user?.enabled ?? false;
  const isUserUndefined = !user && user !== false;
  return (
    <StyledContainer>
      {isUserUndefined ? (
        isAvailable ? (
          <Loading message={"Getting user data"} />
        ) : (
          <Loading message={"Connecting"} />
        )
      ) : isAvailable ? (
        isUserEnabled ? (
          <>{children}</>
        ) : (
          <Loading message={"Reconnecting"} />
        )
      ) : isUserEnabled ? (
        <Loading message={"Reconnecting"} />
      ) : (
        <StyledContainer>
          <Typography color="black">
            Your account is disabled, try again
          </Typography>
          <StyledButton onClick={() => send("reconnect")}>
            Try again
          </StyledButton>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default ReconnectWidget;
