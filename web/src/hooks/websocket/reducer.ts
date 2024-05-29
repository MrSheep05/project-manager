import { CategoryOrStatusBody, ProjectBody, Role } from "../../utils/types";
import { Message, MessageObject } from "./on-message.types";
import { DataState } from "./types";

export const reducer = (state: DataState, action: MessageObject): DataState => {
  const { message, payload } = action;
  switch (message) {
    case Message.AddProject: {
      return { ...state, projects: [payload, ...state.projects] };
    }
    case Message.GetProjects: {
      console.log("ADDING PROJECTS", payload);
      const projects = payload.reduce((all, project) => {
        const i = all.findIndex(({ id }) => id === project.id);
        i > -1 ? (all[i] = project) : all.push(project);
        console.log("ALL", all);
        return all;
      }, state.projects as ProjectBody[]);
      console.log(projects);

      return { ...state, projects };
    }
    case Message.GetStatusAndCategory: {
      const categories = state.categories.reduce((all, category) => {
        const exists = all.find(({ id }) => id === category.id);
        if (!exists) all.push(category);
        return all;
      }, (payload.categories ?? []) as CategoryOrStatusBody[]);
      const status = state.status.reduce((all, state) => {
        const exists = all.find(({ id }) => id === state.id);
        if (!exists) all.push(state);
        return all;
      }, (payload.status ?? []) as CategoryOrStatusBody[]);
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
        uid: payload.user_id,
        isAdmin: payload.role === Role.Admin,
        isAccountEnabled: payload.enabled,
      };
    }
    default: {
      return state;
    }
  }
};
