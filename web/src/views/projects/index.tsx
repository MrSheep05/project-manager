import { useContext, useEffect, useState } from "react";
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
import { IconButton } from "@mui/material";
import { SendAction } from "../../hooks/websocket/types";

const DISLAY_COUNT = 10;
const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  const [offset, setOffset] = useState(0);
  useEffect(() => console.log(state), [state]);
  useEffect(() => {
    if (offset + DISLAY_COUNT >= state.projects.length) {
      send({
        action: SendAction.GetProjects,
        payload: { offsetId: state.projects.slice(-1)[0]?.id },
      });
    }
  }, [offset]);
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledList key={state.uid}>
        <StyledList style={{ overflow: "auto" }}>
          {state.projects
            .slice(offset, offset + DISLAY_COUNT)
            .map((project) => (
              <Project project={project} key={project.id} />
            ))}
        </StyledList>
        <StyledRow>
          <IconButton
            disabled={offset === 0}
            onClick={() => {
              if (offset === 0) return;
              setOffset((x) => (x -= DISLAY_COUNT));
            }}
          >
            <StyledLeftArrow />
          </IconButton>
          <IconButton
            disabled={
              state.reachedAllProjects &&
              offset + DISLAY_COUNT >= state.projects.length
            }
            onClick={() => {
              if (state.reachedAllProjects) return;
              setOffset((x) => (x += DISLAY_COUNT));
            }}
          >
            <StyledRightArrow />
          </IconButton>
        </StyledRow>
      </StyledList>
      <AddProject />
    </StyledContainer>
  );
};

export default Projects;
