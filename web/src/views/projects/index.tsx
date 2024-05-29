import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";

import { useNavigate } from "react-router-dom";
import AddProject from "../home/widgets/addProject";
import { StyledContainer, StyledList } from "./styled";
import { Project } from "./widgets/project";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);

  useEffect(() => console.log(state), [state]);
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledList key={state.uid}>
        {state.projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </StyledList>
      <AddProject />
    </StyledContainer>
  );
};

export default Projects;
