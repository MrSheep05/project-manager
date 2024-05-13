import { WebSocket } from "ws";
import { webSocket } from "../configs/websocket";
import { PostToConnectionsFn } from "./types";

export { onConnect } from "./connect";

export const postToConnections: PostToConnectionsFn = async ({
  message,
  connections = [],
  everyone = false,
}) => {
  const clients = everyone
    ? [...webSocket.clients]
    : [...webSocket.clients].filter((client) => {
        try {
          return connections.includes((client as WebSocket).connectionId);
        } catch (_e) {
          return false;
        }
      });
  clients.forEach((ws) => ws.send(message));
};
