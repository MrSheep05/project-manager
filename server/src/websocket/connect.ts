import { HEARTBEAT_VALUE } from "../configs/websocket";
import { println } from "../log";
import { Severity } from "../log/types";
import { addConnection, removeConnection } from "./database";
import { onMessage } from "./message";
import { OnConnectFn } from "./types";
import crypto from "crypto";

export const onConnect: OnConnectFn = async (ws, request, ...args) => {
  const connectionId = crypto.randomUUID();
  ws.connectionId = connectionId;
  ws.isAlive = true;
  if (!args[0]?.uid) return ws.close();
  const { uid } = args[0];
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

  ws.on("message", async (data, isBinary) => {
    if (isBinary && data[0] === HEARTBEAT_VALUE) {
      ws.isAlive = true;
    } else {
      await onMessage({ data, ws });
    }
  });
};
