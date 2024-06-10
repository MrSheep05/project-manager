import { useContext, useState } from "react";
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
import AddProject from "./widgets/addProject";

const renderProjects = (
  list: ProjectBody[],
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>
): JSX.Element[] => {
  return getWindow(list, 2).map(([first, second], i) => (
    <StyledColumn key={i}>
      {first ? (
        <Project
          project={first}
          key={first.id}
          setIsScrolling={setIsScrolling}
        />
      ) : (
        <StyledPlaceholder />
      )}
      {second ? (
        <Project
          project={second}
          key={second.id}
          setIsScrolling={setIsScrolling}
        />
      ) : (
        <StyledPlaceholder />
      )}
    </StyledColumn>
  ));
};

const Projects = () => {
  const { send, state } = useContext(WebsocketState);
  const [isScrollingProject, setIsScrollingProject] = useState(false);
  return (
    <StyledContainer>
      <StyledContainer flex={1}>
        <AddProject />
      </StyledContainer>
      <StyledContainer flex={2}>
        <StyledRow alignItems={"flex-start"}>
          {state.projects.length > 0 ? (
            <ScrollableView
              shouldNotScroll={isScrollingProject}
              reachedEnd={state.reachedAllProjects}
              onReachedEnd={() => {
                if (state.projects.length === 0 || state.reachedAllProjects)
                  return;
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
              {renderProjects(state.projects, setIsScrollingProject)}
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
