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
  | UserInfoMessage;

export enum Message {
  AddProject = "addProject",
  RemoveStatus = "removeStatus",
  RemoveCategory = "removeCategory",
  GetStatusAndCategory = "getStatusAndCategory",
  GetProjects = "getProjects",
  ChangeAccountState = "changeAccountState",
  GetUsers = "getUsers",
  UserInfo = "userInfo",
}

type AddProjectMessage = {
  message: Message.AddProject;
  payload: ProjectBody;
};

type GetStatusAndCategoryMessage = {
  message: Message.GetStatusAndCategory;
  payload: {
    status?: CategoryOrStatusBody[];
    categories?: CategoryOrStatusBody[];
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
  message: Message.UserInfo;
  payload: UserInfo;
};
