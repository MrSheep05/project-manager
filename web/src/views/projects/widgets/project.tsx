import { Typography } from "@mui/material";
import { ProjectBody } from "../../../utils/types";
import {
  StyledCategory,
  StyledProjectContainer,
  StyledRow,
  StyledTitle,
} from "./styled";
import { useContext, useState } from "react";
import { WebsocketState } from "../../../hooks/websocket";

//TODO Filip move to styled
export const Project = ({
  project,
  setIsScrolling,
}: {
  project: ProjectBody;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { state } = useContext(WebsocketState);
  const [timeout, setTimeoutS] = useState<NodeJS.Timeout | undefined>();

  return (
    <StyledProjectContainer>
      <StyledRow key={project.id}>
        <StyledTitle>{project.title}</StyledTitle>
        {project.categories.map((category) => (
          <StyledCategory color={category.color} key={category.id}>
            <Typography color={category.color}>{category.name}</Typography>
          </StyledCategory>
        ))}
      </StyledRow>
      <div
        style={{ overflow: "scroll" }}
        onScroll={(_) => {
          console.log("SCROLL");
          clearTimeout(timeout);
          setIsScrolling(true);
          setTimeoutS(setTimeout(() => setIsScrolling(false), 500));
        }}
      >
        <Typography>{project.content}</Typography>
      </div>
      <StyledRow style={{ marginTop: "auto", justifyContent: "space-between" }}>
        <Typography style={{ textDecoration: "underline" }}>
          {new Intl.DateTimeFormat("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(project.timestamp))}
        </Typography>
        <StyledCategory color={project.status.color}>
          {" "}
          <Typography color={project.status.color}>
            {project.status.name}
          </Typography>
        </StyledCategory>
      </StyledRow>
      {project.user_id !== state.uid ? (
        <Typography>{`Created by ${project.user_email}`}</Typography>
      ) : null}
    </StyledProjectContainer>
  );
};
