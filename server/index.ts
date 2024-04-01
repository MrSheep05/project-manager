import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import keys from "./client.keys.json";
import express from "express";
import { WebSocketServer } from "ws";
import crypto from "crypto";
import { onConnect } from "./src/websocket/connect";
const app = express();
const webSocket = new WebSocketServer({ port: 443 });

webSocket.on("connection", onConnect);

app.get("/auth/google", (_, res) => {
  try {
    const client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      "http://localhost:3000/oauth2callback"
    );
    const redirectURL = client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.email openid",
      redirect_uri: "http://localhost:3000/oauth2callback",
    });
    console.log(redirectURL);
    res.redirect(redirectURL);
  } catch (e) {
    console.log(e);
  }
});

app.get("/oauth2callback", async (req, res) => {
  const client = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    "http://localhost:3000/oauth2callback"
  );
  const { code } = req.query;
  try {
    const response = await client.getToken(code as string);

    res.redirect(`/?token=${response.tokens.access_token}`);
  } catch (e) {
    console.log(e);
    res.redirect("/login");
  }
});
app.listen(3000);
