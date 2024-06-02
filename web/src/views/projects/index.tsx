import { useContext } from "react";
import { WebsocketState } from "../../hooks/websocket";
import { StyledColumn, StyledContainer, StyledRow } from "./styled";
import { Project } from "./widgets/project";
import { Box } from "@mui/material";
import { SendAction } from "../../hooks/websocket/types";
import { getWindow } from "../../utils";
import ScrollableView from "../../components/scrollable-view";
import { StyledLoadingProject } from "./widgets/styled";

const Projects = () => {
  const { send, state } = useContext(WebsocketState);
  return (
    <StyledContainer>
      <StyledContainer flex={1} border={"1px solid red"}></StyledContainer>
      <StyledContainer flex={2}>
        <StyledRow>
          {state.projects.length > 0 ? (
            <ScrollableView
              reachedEnd={state.reachedAllProjects}
              onReachedEnd={() => {
                send({
                  action: SendAction.GetProjects,
                  payload: { offsetId: state.projects.slice(-1)[0]?.id },
                });
              }}
              style={{
                gap: "2vmin",
                flex: 1,
                maxHeight: "62vh",
                paddingBottom: "2vmin",
              }}
              loader={
                <StyledColumn>
                  <StyledLoadingProject flex={1} />
                  <StyledLoadingProject flex={1} />
                </StyledColumn>
              }
            >
              {getWindow(state.projects, 2).map(([first, second], i) => (
                <StyledColumn key={i}>
                  {first ? (
                    <Project project={first} key={first.id} />
                  ) : (
                    <Box flex={1} padding={"1vmin"}></Box>
                  )}
                  {second ? (
                    <Project project={second} key={second.id} />
                  ) : (
                    <Box flex={1} padding={"1vmin"}></Box>
                  )}
                </StyledColumn>
              ))}
            </ScrollableView>
          ) : (
            <StyledLoadingProject />
          )}
        </StyledRow>
      </StyledContainer>
    </StyledContainer>
  );
};

export default Projects;
