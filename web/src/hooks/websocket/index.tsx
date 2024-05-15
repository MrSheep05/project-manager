import { createContext, useContext, useReducer } from "react";
import { ComponentWrapper } from "../../utils/types";
import { useWebsocket } from "./use-websocket";
import { reducer } from "./reducer";
import { DataState, SendAction, SendFn, WebsocketStateContext } from "./types";
import { setTimeout } from "timers/promises";
import { Message } from "./on-message.types";
import { AppState } from "../app-state";

export const WebsocketState = createContext({} as WebsocketStateContext);

const initialData: DataState = {
  categories: [],
  status: [],
  users: [],
  projects: [],
  isAdmin: false,
  isAccountEnabled: false,
};

export const WebsocketStateComponent: ComponentWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  const { isAvailable, send } = useWebsocket(state, dispatch);

  return (
    <WebsocketState.Provider value={{ send, isAvailable, state }}>
      {children}
    </WebsocketState.Provider>
  );
};
