import { useCallback, useContext, useEffect, useState } from "react";
import {
  PrepareListenerFn,
  SendAction,
  SendFn,
  UseWebsocketHook,
  WebSocketExt,
} from "./types";
import { AppState } from "../app-state";
import { useNavigate } from "react-router-dom";
import { Tokens } from "../../utils/types";
import { onMessage } from "./on-message";
import { Message } from "./on-message.types";
import { AppAction } from "../app-state/types";
import { AppRoutes } from "../../routes/types";
import { isBinary } from "../../utils";

const HEARTBEAT_TIMEOUT = 1000 * 17;
const HEARTBEAT_VALUE = 1;
const WEBSOCKET_ADDRESS = "ws://localhost:8080";
const websocketUrl = (tokens: Tokens): string =>
  `${WEBSOCKET_ADDRESS}?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;

export const useWebsocket: UseWebsocketHook = (state, dispatch) => {
  const [websocket, setWebsocket] = useState<WebSocketExt>();
  const [isAvailable, setIsAvailable] = useState(false);

  const send = useCallback<SendFn>(
    (message) => {
      if (!websocket) return;
      if (message === "reconnect" && tokens) {
        setIsAvailable(true);
        setTimeout(
          () => setWebsocket(new WebSocket(websocketUrl(tokens))),
          500
        );
      } else if (!isAvailable) {
        websocket.send(JSON.stringify(message));
      }
    },
    [isAvailable, websocket]
  );

  const heartbeat = useCallback(() => {
    if (!websocket) return;
    if (websocket.pingTimeout) {
      clearTimeout(websocket.pingTimeout);
    }
    websocket.pingTimeout = setTimeout(
      () => websocket.close(),
      HEARTBEAT_TIMEOUT
    );

    const data = new Uint8Array(1);
    data[0] = HEARTBEAT_VALUE;
    websocket.send(data);
  }, [websocket]);

  const {
    state: { tokens },
    dispatch: saveUser,
  } = useContext(AppState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!websocket && tokens) {
      const ws = new WebSocket(websocketUrl(tokens));
      setWebsocket(ws);
    }
  }, [websocket, tokens]);

  useEffect(() => {
    if (!websocket) return;
    prepareListener(websocket, "open", async () => {
      setIsAvailable(true);
      setTimeout(() => {
        websocket.send(
          JSON.stringify({
            action: SendAction.GetStatusAndCategory,
            payload: {},
          })
        );
        websocket.send(
          JSON.stringify({ action: SendAction.GetProjects, payload: {} })
        );
      }, 500);
    });

    prepareListener(websocket, "close", () => {
      console.log("close");
      clearTimeout(websocket.pingTimeout);
      setIsAvailable(false);
      if (!tokens) return navigate(AppRoutes.Login);
      if (state.isAccountEnabled)
        setWebsocket(new WebSocket(websocketUrl(tokens)));
    });

    prepareListener(websocket, "error", () => {
      websocket.close();
    });

    prepareListener(websocket, "message", ({ data }: MessageEvent<any>) => {
      if (isBinary(data)) {
        console.log("PONG");
        heartbeat();
        return;
      }
      const message = onMessage(data);
      console.log(data);
      if (message?.message === Message.UserData) {
        saveUser({ type: AppAction.SaveUser, payload: message.payload });
        dispatch(message);
      } else if (message) {
        dispatch(message);
      }
    });
  }, [websocket, tokens]);

  return { isAvailable, send };
};

const prepareListener: PrepareListenerFn = (websocket, eventName, fn) => {
  if (!websocket) return () => {};

  websocket.addEventListener(eventName, fn);
  return () => {
    websocket.removeEventListener(eventName, fn);
  };
};
