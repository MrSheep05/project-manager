import { NavigateFunction } from "react-router-dom";
import { Tokens } from "../../utils/types";

export type UseWebsocketHook = (
  dispatch: React.Dispatch<WebsocketDispatch>
) => {
  isAvailable: boolean;
  send: SendMessageFn;
};

export type WebsocketStateContext = {
  isAvailable: boolean;
  send: () => void;
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

export type DataState = {};

export enum WebsocketAction {
  GetStatusAndCategories,
}

export type WebsocketDispatch = GetStatusAndCategoriesD;

type GetStatusAndCategoriesD = {
  type: WebsocketAction.GetStatusAndCategories;
  payload: {};
};
