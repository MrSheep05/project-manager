import { postToConnections } from "..";
import { webSocket } from "../../configs/websocket";
import { getConnections } from "../../queries";
import { WebSocket } from "ws";

import { Role } from "../../queries/types";
import { disableAccount, enableAccount, removeConnection } from "../database";
import { ChangeAccountStateMessageFn } from "./types";
import { println } from "../../log";

export const changeAccountStateMessage: ChangeAccountStateMessageFn = async ({
  message,
  connectionId,
}) => {
  const {
    action,
    payload: { state, uid },
  } = message;
  const connections = await getConnections({ role: Role.Admin, uid });
  const connectionsIds = connections.map(({ connection_id }) => connection_id);
  const result = state
    ? await enableAccount({ connectionId, uid })
    : await disableAccount({ connectionId, uid });
  postToConnections({
    connections: connectionsIds,
    message: JSON.stringify({ message: action, payload: result }),
  });
  if (!state) {
    const connectionI = connections.find(({ user_id }) => user_id === uid);
    if (!connectionI) return;
    const client = [...webSocket.clients].find(
      (client) =>
        ((client as WebSocket).connectionId = connectionI.connection_id)
    );
    await removeConnection(connectionI.connection_id);
    client.terminate();
  }
};
