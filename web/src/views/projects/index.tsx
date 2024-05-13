import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  useEffect(() => console.log(state), [state]);
  return <div>ISAvailable {isAvailable ? "TAK" : "NIE"}</div>;
};

export default Projects;
