import { useContext, useEffect, useState } from "react";
import { WebsocketState } from "../../hooks/websocket";

import { useNavigate } from "react-router-dom";
import {
  StyledColumn,
  StyledContainer,
  StyledList,
  StyledRow,
  StyledRowList,
} from "./styled";
import { Project } from "./widgets/project";
import { Box } from "@mui/material";
import { SendAction } from "../../hooks/websocket/types";
import { getWindow } from "../../utils";

const DISLAY_COUNT = 10;
const Projects = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (offset >= state.projects.length) {
      send({
        action: SendAction.GetProjects,
        payload: { offsetId: state.projects.slice(-1)[0]?.id },
      });
    }
  }, [offset, state]);
  const navigate = useNavigate();
  return (
    <StyledContainer>
      {/* <StyledRow>
          <IconButton
          disabled={offset === 0}
          onClick={() => {
            if (offset === 0) return;
            setOffset(offset - DISLAY_COUNT);
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
            if (
              state.reachedAllProjects &&
              offset + DISLAY_COUNT >= state.projects.length
            )
            return;
            setOffset(offset + DISLAY_COUNT);
          }}
          >
          <StyledRightArrow />
          </IconButton>
        </StyledRow> */}

      <StyledContainer flex={1} border={"1px solid red"}></StyledContainer>
      <StyledContainer flex={2}>
        <StyledRow>
          <StyledRowList flex={1}>
            {getWindow(state.projects, 2).map(([first, second]) => (
              <StyledColumn>
                {first ? (
                  <Project project={first} key={first.id} />
                ) : (
                  <Box flex={1}></Box>
                )}
                {second ? (
                  <Project project={second} key={second.id} />
                ) : (
                  <Box flex={1}></Box>
                )}
              </StyledColumn>
            ))}
          </StyledRowList>
        </StyledRow>
      </StyledContainer>
    </StyledContainer>
  );
};

export default Projects;
