import { webSocket } from "../..";
import { println } from "../log";
import { WebSocketClient } from "./types";

export { onConnect } from "./connect";

export const postToConnections: PostToConnectionsFn = async ({
  message,
  connections,
}) => {
  const clients = [...webSocket.clients].filter((client) => {
    try {
      return connections.includes(
        (client as unknown as WebSocketClient).connectionId
      );
    } catch (_e) {
      return false;
    }
  });
  clients.forEach((ws) => ws.send(message));
};

export type PostToConnectionsFn = ({
  connections,
  message,
}: {
  connections: string[];
  message: string;
}) => Promise<void>;
