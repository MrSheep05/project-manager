import { useContext, useEffect, useState } from "react";
import {
  CreateWebsocketFn,
  PrepareListenerFn,
  UseWebsocketHook,
} from "./types";
import { AppState } from "../app-state";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/types";
import { Tokens } from "../../utils/types";
import { onMessage } from "./on-message";
import { Message } from "./on-message.types";
import { AppAction } from "../app-state/types";

const WEBSOCKET_ADDRESS = "ws://localhost:3000";
const websocketUrl = (tokens: Tokens): string =>
  `${WEBSOCKET_ADDRESS}?accessToken=${tokens.accessToken}&?refreshToken=${tokens.refreshToken}`;

export const useWebsocket: UseWebsocketHook = (dispatch) => {
  const [ws, setWebsocket] = useState<WebSocket>();
  const [isAvailable, setIsAvailable] = useState(false);
  const {
    state: { tokens },
    dispatch: saveUser,
  } = useContext(AppState);
  const navigate = useNavigate();

  const send = () => {
    if (!isAvailable || !ws) return;
    ws.send(JSON.stringify({}));
  };

  useEffect(() => {
    if (!ws) {
      setWebsocket(createWebsocket(tokens, navigate));
    }
  }, [ws, tokens]);

  useEffect(() => {
    if (!ws) return;
    prepareListener(ws, "close", () => {
      setIsAvailable(false);
      setWebsocket(createWebsocket(tokens, navigate));
    });

    prepareListener(ws, "error", () => ws.close());

    prepareListener(ws, "open", () => {
      setIsAvailable(true);
      // TODO fn on open
    });

    prepareListener(ws, "message", ({ data }: MessageEvent<string>) => {
      const message = onMessage(data);
      if (message?.message === Message.UserInfo) {
        saveUser({ type: AppAction.SaveUser, payload: message.payload });
        dispatch(message);
      } else if (message) {
        dispatch(message);
      }
    });
  }, [ws, tokens]);

  return { isAvailable, send };
};

const prepareListener: PrepareListenerFn = (ws, eventName, fn) => {
  if (!ws) return () => {};

  ws.addEventListener(eventName, fn);

  return () => {
    ws.removeEventListener(eventName, fn);
  };
};

const createWebsocket: CreateWebsocketFn = (tokens, navigate) => {
  if (!tokens?.accessToken || !tokens.refreshToken) {
    navigate(Routes.Login);
    return;
  }

  return new WebSocket(websocketUrl(tokens));
};
