import {
  CategoryOrStatusBody,
  ProjectBody,
  UserBody,
  UserInfo,
} from "../../utils/types";

export type OnMessageFn = (message: string) => MessageObject | undefined;

export type MessageObject =
  | AddProjectMessage
  | GetStatusAndCategoryMessage
  | ChangeAccountStateMessage
  | GetProjectsMessage
  | GetUsersMessage
  | RemoveStatusOrCategoryMessage
  | UserInfoMessage
  | GetConnectionId;

export enum Message {
  AddProject = "addProject",
  RemoveStatus = "removeStatus",
  RemoveCategory = "removeCategory",
  GetStatusAndCategory = "getStatusAndCategory",
  GetProjects = "getProjects",
  ChangeAccountState = "changeAccountState",
  GetUsers = "getUsers",
  UserData = "userData",
  GetConnectionId = "getConnectionId",
}

type AddProjectMessage = {
  message: Message.AddProject;
  payload: ProjectBody;
};

type GetConnectionId = {
  message: Message.GetConnectionId;
  payload: { connectionId: string };
};
type GetStatusAndCategoryMessage = {
  message: Message.GetStatusAndCategory;
  payload: {
    status?: CategoryOrStatusBody[] | CategoryOrStatusBody;
    categories?: CategoryOrStatusBody[] | CategoryOrStatusBody;
  };
};

type ChangeAccountStateMessage = {
  message: Message.ChangeAccountState;
  payload: UserBody;
};

type GetUsersMessage = {
  message: Message.GetUsers;
  payload: UserBody[];
};

type GetProjectsMessage = {
  message: Message.GetProjects;
  payload: ProjectBody[];
};

type RemoveStatusOrCategoryMessage = {
  message: Message.RemoveCategory | Message.RemoveStatus;
  payload: CategoryOrStatusBody;
};

type UserInfoMessage = {
  message: Message.UserData;
  payload: UserInfo;
};
