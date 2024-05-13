import { NavigateFunction } from "react-router-dom";
import {
  CategoryOrStatusBody,
  ProjectBody,
  Tokens,
  UserBody,
} from "../../utils/types";
import { MessageObject } from "./on-message.types";

export type UseWebsocketHook = (
  state: DataState,
  dispatch: React.Dispatch<MessageObject>
) => {
  isAvailable: boolean;
  send: SendFn;
};

export interface WebSocketExt extends WebSocket {
  pingTimeout?: NodeJS.Timeout;
}

export type SendFn = (message: Mesages) => void;

export type WebsocketStateContext = {
  isAvailable: boolean;
  send: SendFn;
  state: DataState;
};

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
  isAccountEnabled: boolean;
};

export enum WebsocketAction {
  GetStatusAndCategories,
}

export enum SendAction {
  AddProject = "addProject",
  AddStatus = "addStatus",
  AddCategory = "addCategory",
  RemoveStatus = "removeStatus",
  RemoveCategory = "removeCategory",
  GetStatusAndCategory = "getStatusAndCategory",
  GetProjects = "getProjects",
  ChangeAccountState = "changeAccountState",
  GetUsers = "getUsers",
}

export type Mesages =
  | AddProjectMessage
  | AddStatusOrCategoryMessage
  | GetStatusAndCategoryMessage
  | RemoveStatusOrCategoryMessage
  | ChangeAccountStateMessage
  | GetUsersMessage
  | GetProjectsMessage;

export type GetProjectsMessage = {
  action: SendAction.GetProjects;
  payload: { offsetId?: string };
};
export type AddProjectMessage = {
  action: SendAction.AddProject;
  payload: {
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};
export type ChangeAccountStateMessage = {
  action: SendAction.ChangeAccountState;
  payload: { state: boolean; uid: string };
};
export type GetUsersMessage = {
  action: SendAction.GetUsers;
  payload: { offsetUid?: string };
};

export type AddStatusOrCategoryMessage = {
  action: SendAction.AddStatus | SendAction.AddCategory;
  payload: {
    color: string;
    name: string;
  };
};

export type GetStatusAndCategoryMessage = {
  action: SendAction.GetStatusAndCategory;
  payload: {};
};

export type RemoveStatusOrCategoryMessage = {
  action: SendAction.RemoveStatus | SendAction.RemoveCategory;
  payload: {
    id: string;
  };
};
