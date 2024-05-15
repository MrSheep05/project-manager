import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";
import { SendAction } from "../../hooks/websocket/types";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  useEffect(() => console.log(state), [state]);
  return (
    <div>
      ISAvailable {isAvailable ? "TAK" : "NIE"}
      <button
        style={{ width: "4vmin", height: "2vmin" }}
        onClick={() =>
          send({
            action: SendAction.ChangeAccountState,
            payload: {
              uid: "91e2e455f5b913e0343c99d227e734de71df9e422cfc7c104ce5d1f320212534",
              state: false,
            },
          })
        }
      ></button>
    </div>
  );
};

export default Projects;
