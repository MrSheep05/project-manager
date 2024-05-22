import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";

import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);

  useEffect(() => console.log(state), [state]);
  const navigate = useNavigate();
  return <div>ISAvailable {isAvailable ? "TAK" : "NIE"}</div>;
};

export default Projects;
