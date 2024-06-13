import { useContext, useEffect } from "react";
import useAdminRoute from "../../hooks/useAdminRoute";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction } from "../../hooks/websocket/types";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { UserBody } from "../../utils/types";
import { StyledBox } from "./styled";

function renderRow(index: number, users: UserBody[]) {
  const user = users[index];

  const ListStyle = {
    color: "black",
  };

  return (
    <ListItem style={ListStyle} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`${user.email}`} />
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
          maxWidth: 360,
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
              {(props) => renderRow(props.index, state.users)}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </StyledBox>
  );
};

export default Users;
