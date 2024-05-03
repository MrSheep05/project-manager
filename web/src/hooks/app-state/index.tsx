import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { AppStateContext } from "./types";
import { ComponentWrapper } from "../../utils/types";

export const AppState = createContext({} as AppStateContext);

export const AppStateComponent: ComponentWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <AppState.Provider value={{ state, dispatch }}>
      {children}
    </AppState.Provider>
  );
};
