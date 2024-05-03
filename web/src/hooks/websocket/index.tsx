import { useReducer } from "react";
import { ComponentWrapper } from "../../utils/types";
import { useWebsocket } from "./use-websocket";
import { createContext } from "vm";
import { reducer } from "./reducer";
import { DataState, WebsocketStateContext } from "./types";

const WebsocketState = createContext({} as WebsocketStateContext);

const initialData: DataState = {
  categories: [],
  status: [],
  users: [],
  projects: [],
  isAdmin: false,
};

export const WebsocketStateComponent: ComponentWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  const { isAvailable, send } = useWebsocket(dispatch);
  return (
    <WebsocketState.Provider value={{ send, isAvailable }}>
      {{ children }}
    </WebsocketState.Provider>
  );
};
