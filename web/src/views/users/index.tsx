import { useContext, useEffect } from "react";
import useAdminRoute from "../../hooks/useAdminRoute";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction } from "../../hooks/websocket/types";

const Users = () => {
  const { state, send } = useContext(WebsocketState);
  useAdminRoute();

  useEffect(() => {
    if (state.users.length === 0)
      send({ action: SendAction.GetUsers, payload: {} });
  }, [state]);

  return <p>USERS</p>;
};

export default Users;
