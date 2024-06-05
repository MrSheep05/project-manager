import { getTokensFromURL } from ".";
import { getClient, getUserInfo } from "../auth";
import crypto from "crypto";
import {
  AuthorizeUpgradeFn,
  HandleErrorCodeFn,
  InformDisabledAccount,
  WebsocketError,
} from "./types";
import { println } from "../log";
import { Severity } from "../log/types";
import { getUserProcedure, registerUser } from "./database";
import { webSocket } from "../configs/websocket";
import { OAuth2Client } from "google-auth-library";

const UNAUTHORIZED_MESSAGE = "'HTTP/1.1 401 Unauthorized\r\n\r\n'";
const UNEXPECTED_MESSAGE = "'HTTP/1.1 500 Unauthorized\r\n\r\n'";

const informDisabledAccount: InformDisabledAccount = ({
  request,
  socket,
  head,
  data,
}) => {
  webSocket.handleUpgrade(request, socket, head, (ws, _req) => {
    ws.send(
      JSON.stringify({
        message: "userData",
        payload: data,
      })
    );
    ws.terminate();
  });
  socket.end("Account created");
};

const getToken = async (client: OAuth2Client): Promise<string | undefined> => {
  const response = await client.getAccessToken();
  return response.res.status === 200 ? response.token : undefined;
};

const handleErrorCode: HandleErrorCodeFn = (request, socket, head, code) => {
  webSocket.handleUpgrade(request, socket, head, (ws, req) => {
    ws.close(code);
  });
};

export const authorizeUpgrade: AuthorizeUpgradeFn = async (
  request,
  socket,
  head
) => {
  socket.on("error", (error) =>
    println(
      { severity: Severity.Error },
      "Before WS connection",
      error.message,
      error.stack
    )
  );

  const tokens = getTokensFromURL(request);
  if (!tokens)
    return handleErrorCode(request, socket, head, WebsocketError.Unauthorized);
  const { refreshToken: refresh_token, accessToken: access_token } = tokens;
  const client = getClient();
  client.setCredentials({ access_token, refresh_token });

  try {
    const accessToken = !access_token ? await getToken(client) : access_token;
    if (!accessToken)
      return handleErrorCode(
        request,
        socket,
        head,
        WebsocketError.Unauthorized
      );
    const { sub, expiry_date, email } = await client.getTokenInfo(accessToken);

    if (Date.now() <= expiry_date) {
      const hashed_sub = await crypto
        .createHash("sha256")
        .update(sub)
        .digest("hex");
      const userData = await getUserProcedure(hashed_sub);
      const { picture, name } = await getUserInfo(client);

      if (!userData) {
        const data = await registerUser({ uid: hashed_sub, email });
        return informDisabledAccount({
          request,
          socket,
          head,
          data: { ...data, picture, name },
        });
      }

      const { enabled, email: userEmail } = userData;
      if (enabled && email === userEmail) {
        const { picture, name } = await getUserInfo(client);
        return webSocket.handleUpgrade(request, socket, head, (ws, req) => {
          webSocket.emit("connection", ws, req, { uid: hashed_sub });
          ws.send(
            JSON.stringify({
              message: "userData",
              payload: { name, picture, ...userData },
            })
          );
        });
      } else {
        return informDisabledAccount({
          request,
          socket,
          head,
          data: { ...userData, picture, name },
        });
      }
    }
    return handleErrorCode(request, socket, head, WebsocketError.Unauthorized);
  } catch (error) {
    handleErrorCode(request, socket, head, WebsocketError.Unexpected);
  }
};
