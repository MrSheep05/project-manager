import { useContext } from "react";
import { WebsocketState } from "../../hooks/websocket";
import {
  StyledColumn,
  StyledContainer,
  StyledPlaceholder,
  StyledRow,
} from "./styled";
import { Project } from "./widgets/project";
import { SendAction } from "../../hooks/websocket/types";
import { getWindow } from "../../utils";
import ScrollableView from "../../components/scrollable-view";
import { StyledLoadingProject } from "./widgets/styled";
import { ProjectBody } from "../../utils/types";
import { Outlet } from "react-router-dom";

const renderProjects = (list: ProjectBody[]): JSX.Element[] => {
  return getWindow(list, 2).map(([first, second], i) => (
    <StyledColumn key={i}>
      {first ? (
        <Project project={first} key={first.id} />
      ) : (
        <StyledPlaceholder />
      )}
      {second ? (
        <Project project={second} key={second.id} />
      ) : (
        <StyledPlaceholder />
      )}
    </StyledColumn>
  ));
};

const Projects = () => {
  const { send, state } = useContext(WebsocketState);
  return (
    <StyledContainer>
      <StyledContainer flex={1} border={"1px solid red"}>
        <Outlet />
      </StyledContainer>
      <StyledContainer flex={2}>
        <StyledRow alignItems={"flex-start"}>
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
                alignItems: "flex-start",
              }}
              loader={
                <StyledColumn>
                  <StyledLoadingProject flex={1} />
                  <StyledLoadingProject flex={1} />
                </StyledColumn>
              }
            >
              {renderProjects(state.projects)}
            </ScrollableView>
          ) : !state.reachedAllProjects ? (
            <StyledColumn>
              <StyledLoadingProject flex={1} />
              <StyledLoadingProject flex={1} />
            </StyledColumn>
          ) : undefined}
        </StyledRow>
      </StyledContainer>
    </StyledContainer>
  );
};

export default Projects;
