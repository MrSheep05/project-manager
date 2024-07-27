import { useContext, useEffect } from "react";
import useAdminRoute from "../../hooks/useAdminRoute";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction, SendFn } from "../../hooks/websocket/types";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Role, UserBody } from "../../utils/types";
import { EnabledSwitch, StyledBox } from "./styled";
import { post } from "../../utils/server-requests";
import ScrollableView from "../../components/scrollable-view";
import path from "path";
import { writeFileSync } from "fs";

function renderRow(
  index: number,
  user: UserBody,
  send: SendFn,
  connectionId: String | undefined,
  uid: String | undefined
) {
  const enabled = Boolean(user.enabled);

  const ListStyle = enabled
    ? { color: "black" }
    : { color: "rgba(0, 0, 0, 0.6)" };

  return (
    <ListItem style={ListStyle} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`${user.email}`} />
        <EnabledSwitch
          disabled={user.id === uid || user.role === Role.Admin}
          defaultChecked={enabled}
          onChange={() =>
            send(
              !enabled
                ? {
                    action: SendAction.ChangeAccountState,
                    payload: { state: true, uid: user.id },
                  }
                : {
                    action: SendAction.ChangeAccountState,
                    payload: { state: false, uid: user.id },
                  }
            )
          }
        />
      </ListItemButton>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            const blob = await post({
              path: "/csv",
              body: { connectionId, usersId: uid },
            }).then((response) => response.blob());
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${user.email}_${new Date()
              .toJSON()
              .slice(0, 10)
              .replace(/-/g, "-")}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (e) {
            console.warn(e);
          }
        }}
      >
        Csv
      </Button>
    </ListItem>
  );
}

const Users = () => {
  const { state, send } = useContext(WebsocketState);
  useAdminRoute();
  const { connectionId } = state;
  useEffect(() => {
    if (state.users.length === 0) {
      send({ action: SendAction.GetUsers, payload: {} });
    }
  }, [state, send]);

  return (
    <StyledBox>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          maxWidth: 460,
          bgcolor: "background.paper",
          overflow: "hidden",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <ScrollableView isVertical={true} onReachedEnd={() => {}}>
          {state.users.map((user, index) =>
            renderRow(index, user, send, connectionId, state.uid)
          )}
        </ScrollableView>
      </Box>
    </StyledBox>
  );
};

export default Users;
