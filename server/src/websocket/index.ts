import { webSocket } from "../..";
import { WebSocketClient } from "./types";

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
  everyone,
}: {
  connections?: string[];
  message: string;
  everyone?: boolean;
}) => Promise<void>;
