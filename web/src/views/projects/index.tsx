import { useContext } from "react";
import { WebsocketState } from "../../hooks/websocket";

const Projects = () => {
  const { isAvailable } = useContext(WebsocketState);
  return <div>ISAvailable {isAvailable ? "TAK" : "NIE"}</div>;
};

export default Projects;
