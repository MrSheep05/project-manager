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
  }
};
