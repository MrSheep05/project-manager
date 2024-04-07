import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import { clearConsole, println } from "./src/log";
import { Severity } from "./src/log/types";
import { authorizeUpgrade } from "./src/express/authorize";
import { googleOAuth, googleToken } from "./src/express/google";

const SERVER_PORT = process.env.SERVER_PORT ?? "3000";
clearConsole();

export const app = express();
export const webSocket = new WebSocketServer({ noServer: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(SERVER_PORT, () => {
  println({ severity: Severity.Info }, "Listening at port", SERVER_PORT);
});

server.on("upgrade", authorizeUpgrade);

app.get("/auth/google", googleOAuth);

app.post("/auth/tokens", googleToken);

app.get("/oauth2callback", (req, res) => {
  const { code } = req.query;
  println({}, code);
  res.write(code);
  res.end();
});
