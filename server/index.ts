import "dotenv/config";
import express from "express";
import { clearConsole, println } from "./src/log";
import { Severity } from "./src/log/types";
import configRoutes from "./src/configs/routes";
import configWebSocket from "./src/configs/websocket";

const SERVER_PORT = process.env.SERVER_PORT ?? "3000";
clearConsole();

export const app = express();

configRoutes(app);

configWebSocket(
  app.listen(SERVER_PORT, () => {
    println({ severity: Severity.Info }, "Listening at port", SERVER_PORT);
  })
);
