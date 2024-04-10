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
  AddStatus = "addStatus",
  AddCategory = "addCategory",
  RemoveStatus = "removeStatus",
  RemoveCategory = "removeCategory",
  GetCategoryAndStatus = "getCategoryAndStatus",
  GetProjects = "getProjects",
  ChangeAccountState = "changeAccountState",
  GetUsers = "getUsers",
}

export type Mesages =
  | AddProjectMessage
  | AddStatusOrCategoryMessage
  | GetStatusAndCategoryMessage;
export type AddProjectMessage = {
  action: Action.AddProject;
  payload: {
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};

export type AddStatusOrCategoryMessage = {
  action: Action.AddStatus | Action.AddCategory;
  payload: {
    color: string;
    name: string;
  };
};

export type GetStatusAndCategoryMessage = {
  action: Action.GetCategoryAndStatus;
  payload: {
    connectionId: string;
  };
};
