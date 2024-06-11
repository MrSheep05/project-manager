import { IncomingMessage } from "http";
import { WebSocket, MessageEvent, RawData } from "ws";

export type PostToConnectionsFn = ({
  connections,
  message,
  everyone,
}: {
  connections?: string[];
  message: string;
  everyone?: boolean;
}) => Promise<void>;

export type OnConnectFn = (
  socket: WebSocket,
  request: IncomingMessage,
  ...args: [{ uid: string }, ...any[]]
) => Promise<void>;

export type OnMessageFn = ({
  data,
  ws,
}: {
  data: RawData;
  ws: WebSocket;
}) => Promise<void>;

export enum Action {
  AddProject = "addProject",
  AddStatus = "addStatus",
  AddCategory = "addCategory",
  RemoveStatus = "removeStatus",
  RemoveCategory = "removeCategory",
  GetStatusAndCategory = "getStatusAndCategory",
  GetProjects = "getProjects",
  ChangeAccountState = "changeAccountState",
  UpdateProject = "updateProject",
  GetUsers = "getUsers",
}

export type Mesages =
  | AddProjectMessage
  | AddStatusOrCategoryMessage
  | GetStatusAndCategoryMessage
  | RemoveStatusOrCategoryMessage
  | ChangeAccountStateMessage
  | GetUsersMessage
  | GetProjectsMessage
  | UpdateProjectMessage;

export type GetProjectsMessage = {
  action: Action.GetProjects;
  payload: { offsetId?: string };
};
export type AddProjectMessage = {
  action: Action.AddProject;
  payload: {
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};

export type UpdateProjectMessage = {
  action: Action.UpdateProject;
  payload: {
    statusId: string;
    projectId: string;
  };
};

export type ChangeAccountStateMessage = {
  action: Action.ChangeAccountState;
  payload: { state: boolean; uid: string };
};
export type GetUsersMessage = {
  action: Action.GetUsers;
  payload: { offsetUid?: string };
};

export type AddStatusOrCategoryMessage = {
  action: Action.AddStatus | Action.AddCategory;
  payload: {
    color: string;
    name: string;
  };
};

export type GetStatusAndCategoryMessage = {
  action: Action.GetStatusAndCategory;
  payload: {
    connectionId: string;
  };
};

export type RemoveStatusOrCategoryMessage = {
  action: Action.RemoveStatus | Action.RemoveCategory;
  payload: {
    id: string;
  };
};
