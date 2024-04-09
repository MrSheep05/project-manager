import { webSocket } from "../..";
import { println } from "../log";
import { Severity } from "../log/types";
import { addConnection, removeConnection } from "./database";
import { onMessage } from "./message";
import { OnConnectFn, WebSocketClient } from "./types";
import crypto from "crypto";

export const onConnect: OnConnectFn = async (ws, request, ...args) => {
  const connectionId = crypto.randomUUID();
  ws.connectionId = connectionId;
  if (!args[0]?.uid) return ws.close();
  const { uid } = args[0];
  webSocket.clients.forEach((e) =>
    console.log("CONNECTIONID", (e as unknown as WebSocketClient).connectionId)
  );
  try {
    await addConnection({ connectionId, uid });
  } catch (err) {
    println({ severity: Severity.Error }, err);
    ws.close();
  }

  ws.addEventListener("close", async (_event) => {
    try {
      await removeConnection(connectionId);
    } catch (err) {
      println({ severity: Severity.Error }, err);
    }
  });

  ws.addEventListener("error", async (event) => {
    try {
      println({ severity: Severity.Error }, "AFTER WS CONNECT ERROR", event);
      await removeConnection(connectionId);
    } catch (err) {
      println({ severity: Severity.Error }, err);
    }
  });

  ws.addEventListener(
    "message",
    async (event) => await onMessage({ event, ws })
  );
};
