import { useContext, useEffect } from "react";
import { WebsocketState } from "../../hooks/websocket";

import { useNavigate } from "react-router-dom";
import AddProject from "../home/widgets/addProject";
import {
  StyledContainer,
  StyledLeftArrow,
  StyledList,
  StyledRightArrow,
  StyledRow,
} from "./styled";
import { Project } from "./widgets/project";
import { Button } from "@mui/material";
import theme from "../../theme";

const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  useEffect(() => console.log(state), [state]);
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledList key={state.uid}>
        <StyledList style={{ overflow: "auto" }}>
          {state.projects.map((project) => (
            <Project project={project} key={project.id} />
          ))}
        </StyledList>
        <StyledRow>
          <Button>
            <StyledLeftArrow />
          </Button>
          <Button>
            <StyledRightArrow />
          </Button>
        </StyledRow>
      </StyledList>
      <AddProject />
    </StyledContainer>
  );
};

export default Projects;
