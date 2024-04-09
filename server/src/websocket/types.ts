import { IncomingMessage } from "http";

export interface WebSocketClient extends WebSocket {
  connectionId: string;
}

export type OnConnectFn = (
  socket: WebSocketClient,
  request: IncomingMessage,
  ...args: [{ uid: string }, ...any[]]
) => Promise<void>;

export type OnMessageFn = ({
  event,
  ws,
}: {
  event: MessageEvent<any>;
  ws: WebSocketClient;
}) => Promise<void>;

export enum Action {
  AddProject = "addProject",
}

export type Mesages = AddProjectMessage;
type AddProjectMessage = {
  action: Action.AddProject;
  payload: {
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};
