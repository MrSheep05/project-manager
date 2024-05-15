import { AppAction, AppDispatch, State } from "./types";

export const reducer = (state: State, action: AppDispatch): State => {
  const { type, payload } = action;

  switch (type) {
    case AppAction.SaveTokens: {
      return { ...state, tokens: payload };
    }
    case AppAction.SaveUser: {
      console.log("SAVEUSER", payload);
      return { ...state, role: payload.role, user: payload };
    }
    case AppAction.ChangeAccountState: {
      console.log("USER CHANGE STATE");
      return {
        ...state,
        ...(state.user && { user: { ...state.user, enabled: payload.state } }),
      };
    }
  }
};
