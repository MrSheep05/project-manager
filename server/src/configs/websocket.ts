import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { authorizeUpgrade } from "../express/authorize";
import { onConnect } from "../websocket";
import { removeConnection } from "../websocket/database";
import { Severity } from "../log/types";
import { println } from "../log";
import { getConnections } from "../queries";

const HEARTBEAT_INTERVAL = 1000 * 15;
export const HEARTBEAT_VALUE = 1;

export const webSocket = new WebSocketServer({ noServer: true });

const ping = (ws: WebSocket) => {
  ws.send(HEARTBEAT_VALUE, { binary: true });
};

const config = (server: Server) => {
  server.on("upgrade", authorizeUpgrade);

  webSocket.on("connection", onConnect);

  const interval = setInterval(async () => {
    webSocket.clients.forEach(async (c) => {
      const client = c as WebSocket;
      if (!client.isAlive) {
        try {
          await removeConnection(client.connectionId);
        } finally {
          client.terminate();
        }
        return;
      }
      client.isAlive = false;
      ping(client);
    });
    try {
      const connections = await getConnections({});
      const current = [...webSocket.clients].map(
        (c) => (c as WebSocket).connectionId
      );
      connections
        .filter(({ connection_id }) => !current.includes(connection_id))
        .forEach(async ({ connection_id }) => {
          await removeConnection(connection_id);
        });
    } catch (err) {
      println({ severity: Severity.Error }, err);
    }
  }, HEARTBEAT_INTERVAL);

  webSocket.on("close", () => clearInterval(interval));
};

export default config;
