import { useContext, useEffect } from "react";
import useAdminRoute from "../../hooks/useAdminRoute";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction, SendFn } from "../../hooks/websocket/types";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FixedSizeList } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { Role, UserBody } from "../../utils/types";
import { EnabledSwitch, StyledBox } from "./styled";

function renderRow(
  index: number,
  users: UserBody[],
  send: SendFn,
  uid: String | undefined
) {
  const user = users[index];
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
    </ListItem>
  );
}

const Users = () => {
  const { state, send } = useContext(WebsocketState);
  useAdminRoute();

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
        <AutoSizer>
          {({ height, width }: Size) => (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={state.users.length}
              itemSize={35}
            >
              {(props) => renderRow(props.index, state.users, send, state.uid)}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </StyledBox>
  );
};

export default Users;
