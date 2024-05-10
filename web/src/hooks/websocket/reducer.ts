import { Role } from "../../utils/types";
import { Message, MessageObject } from "./on-message.types";
import { DataState } from "./types";

export const reducer = (state: DataState, action: MessageObject): DataState => {
  const { message, payload } = action;
  switch (message) {
    case Message.AddProject: {
      return { ...state, projects: [payload, ...state.projects] };
    }
    case Message.GetProjects: {
      return { ...state, projects: [...state.projects, ...payload] };
    }
    case Message.GetStatusAndCategory: {
      return {
        ...state,
        categories: [...(payload.categories ?? []), ...state.categories],
        status: [...(payload.status ?? []), ...state.status],
      };
    }
    case Message.GetUsers: {
      return {
        ...state,
        users: payload,
      };
    }
    case Message.ChangeAccountState: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    }
    case Message.RemoveCategory: {
      return {
        ...state,
        categories: state.isAdmin
          ? state.categories.map((category) =>
              category.id === payload.id ? payload : category
            )
          : state.categories.filter((category) => category.id !== payload.id),
      };
    }
    case Message.RemoveStatus: {
      return {
        ...state,
        status: state.isAdmin
          ? state.status.map((status) =>
              status.id === payload.id ? payload : status
            )
          : state.status.filter((status) => status.id !== payload.id),
      };
    }
    case Message.UserData: {
      return { ...state, isAdmin: payload.role === Role.Admin };
    }
    default: {
      return state;
    }
  }
};
