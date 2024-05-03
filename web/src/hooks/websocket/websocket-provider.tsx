import { useReducer } from "react";
import { ComponentWrapper } from "../../utils/types";
import { useWebsocket } from "./use-websocket";
import { createContext } from "vm";
import { reducer } from "./reducer";
import { WebsocketStateContext } from "./types";

const WebsocketState = createContext({} as WebsocketStateContext);

export const WebsocketStateComponent: ComponentWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const { isAvailable, send } = useWebsocket(dispatch);
  return (
    <WebsocketState.Provider value={{ send, isAvailable }}>
      {{ children }}
    </WebsocketState.Provider>
  );
};
