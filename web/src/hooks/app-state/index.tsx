import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { AppAction, AppDispatch, AppStateContext, State } from "./types";
import { ComponentWrapper, Role } from "../../utils/types";
import { redirect, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/types";

export const AppState = createContext({} as AppStateContext);

const initialState: State = {
  role: Role.User,
};

export const AppStateComponent: ComponentWrapper = ({ children }) => {
  const [state, dispatchFn] = useReducer(reducer, initialState);

  const dispatch = (action: AppDispatch) => {
    dispatchFn(action);
    // if (action.type === AppAction.SaveTokens) navigate(AppRoutes.Home);
  };

  return (
    <AppState.Provider value={{ state, dispatch }}>
      {children}
    </AppState.Provider>
  );
};
