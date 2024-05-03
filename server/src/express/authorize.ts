import { webSocket } from "../..";
import { getTokensFromURL } from ".";
import { getClient, getUserInfo } from "../auth";
import crypto from "crypto";
import { AuthorizeUpgradeFn, InformDisabledAccount } from "./types";
import { println } from "../log";
import { Severity } from "../log/types";
import { getUserProcedure, registerUser } from "./database";

const UNAUTHORIZED_MESSAGE = "HTTP 403: Unauthorized";
const UNEXPECTED_MESSAGE = "HTTP 500: Unexpected";

const informDisabledAccount: InformDisabledAccount = ({
  request,
  socket,
  head,
  data,
}) => {
  webSocket.handleUpgrade(request, socket, head, (ws, _req) => {
    ws.send(
      JSON.stringify({
        action: "userData",
        payload: data,
      })
    );
    ws.close();
  });
  socket.end("Account created");
};

export const authorizeUpgrade: AuthorizeUpgradeFn = async (
  request,
  socket,
  head
) => {
  socket.on("error", (error) =>
    println({ severity: Severity.Error }, "Before WS connection", error.message)
  );

  const tokens = getTokensFromURL(request);
  if (!tokens) return socket.end(UNAUTHORIZED_MESSAGE);
  const { refreshToken: refresh_token, accessToken: access_token } = tokens;
  const client = getClient();
  client.setCredentials({ access_token, refresh_token });

  try {
    const accessToken = !access_token
      ? (await client.getAccessToken()).token
      : access_token;
    const { sub, expiry_date, email } = await client.getTokenInfo(accessToken);

    if (Date.now() <= expiry_date) {
      const hashed_sub = await crypto
        .createHash("sha256")
        .update(sub)
        .digest("hex");
      const userData = await getUserProcedure(hashed_sub);

      if (!userData) {
        const data = await registerUser({ uid: hashed_sub, email });
        informDisabledAccount({ request, socket, head, data });
        return;
      }

      const { enabled, email: userEmail, role } = userData;
      if (enabled && email === userEmail) {
        const userData = await getUserInfo(client);
        webSocket.handleUpgrade(request, socket, head, (ws, req) => {
          webSocket.emit("connection", ws, req, { uid: hashed_sub });
          ws.send(
            JSON.stringify({
              message: "userData",
              payload: { ...userData, email, role },
            })
          );
        });
      } else {
        informDisabledAccount({ request, socket, head, data: userData });
        return;
      }
    }
  } catch (error) {
    socket.end(UNEXPECTED_MESSAGE);
    return;
  }
};
