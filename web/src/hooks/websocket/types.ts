import { NavigateFunction } from "react-router-dom";
import { Tokens } from "../../utils/types";

export type UseWebsocketHook = () => {
  websocket?: WebSocket;
  send: SendMessageFn;
};

export type SendMessageFn = () => void;

export type PrepareListenerFn = (
  ws: WebSocket | undefined,
  eventName: keyof WebSocketEventMap,
  fn: (...params: any[]) => void
) => () => void;

export type CreateWebsocketFn = (
  tokens: Tokens | undefined,
  navigate: NavigateFunction
) => WebSocket | undefined;
