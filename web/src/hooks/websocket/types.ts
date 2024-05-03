import { NavigateFunction } from "react-router-dom";
import {
  CategoryOrStatusBody,
  ProjectBody,
  Tokens,
  UserBody,
} from "../../utils/types";
import { MessageObject } from "./on-message.types";

export type UseWebsocketHook = (dispatch: React.Dispatch<MessageObject>) => {
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

export type DataState = {
  isAdmin: boolean;
  categories: CategoryOrStatusBody[];
  status: CategoryOrStatusBody[];
  users: UserBody[];
  projects: ProjectBody[];
};

export enum WebsocketAction {
  GetStatusAndCategories,
}
