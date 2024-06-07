import { updateStatusOrCategory } from "../../utils";
import { CategoryOrStatusBody, ProjectBody, Role } from "../../utils/types";
import { Message, MessageObject } from "./on-message.types";
import { DataState } from "./types";

export const reducer = (state: DataState, action: MessageObject): DataState => {
  const { message, payload } = action;
  switch (message) {
    case Message.AddProject: {
      const i = state.projects.findIndex(({ id }) => id === payload.id);
      if (i > -1) {
        const projects = state.projects;
        projects[i] = payload;
        return { ...state, projects };
      }
      return { ...state, projects: [payload, ...state.projects] };
    }
    case Message.GetProjects: {
      const projects = payload.reduce((all, project) => {
        const i = all.findIndex(({ id }) => id === project.id);
        i > -1 ? (all[i] = project) : all.push(project);
        return all;
      }, state.projects as ProjectBody[]);

      return { ...state, projects, reachedAllProjects: payload.length !== 20 };
    }
    case Message.GetStatusAndCategory: {
      const categories = updateStatusOrCategory({
        current: state.categories,
        payload: payload.categories,
      });
      const status = updateStatusOrCategory({
        current: state.status,
        payload: payload.status,
      });

      return {
        ...state,
        categories,
        status,
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
          ? [...state.categories].map((category) =>
              category.id === payload.id ? payload : category
            )
          : [...state.categories].filter(
              (category) => category.id !== payload.id
            ),
      };
    }
    case Message.RemoveStatus: {
      return {
        ...state,
        status: state.isAdmin
          ? [...state.status].map((status) =>
              status.id === payload.id ? payload : status
            )
          : [...state.status].filter((status) => status.id !== payload.id),
      };
    }
    case Message.UserData: {
      return {
        ...state,
        uid: payload.id,
        isAdmin: payload.role === Role.Admin,
        isAccountEnabled: payload.enabled,
      };
    }
    default: {
      return state;
    }
  }
};
