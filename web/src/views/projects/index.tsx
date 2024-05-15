import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction } from "../../hooks/websocket/types";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  useEffect(() => console.log(state), [state]);
  return <div>ISAvailable {isAvailable ? "TAK" : "NIE"}</div>;
};

export default Projects;
