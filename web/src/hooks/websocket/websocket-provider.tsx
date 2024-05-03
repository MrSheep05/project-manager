import { ComponentWrapper } from "../../utils/types";
import { useWebsocket } from "./use-websocket";
import { createContext } from "vm";

const WebsocketState = createContext({} as any);

export const WebsocketStateComponent: ComponentWrapper = ({ children }) => {
  const { websocket, send } = useWebsocket();

  return (
    <WebsocketState.Provider value={{ websocket }}>
      {{ children }}
    </WebsocketState.Provider>
  );
};
