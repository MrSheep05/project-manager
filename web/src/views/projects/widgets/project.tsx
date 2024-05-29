import { Typography } from "@mui/material";
import { ProjectBody } from "../../../utils/types";
import {
  StyledCategory,
  StyledProjectContainer,
  StyledRow,
  StyledTitle,
} from "./styled";

//TODO Filip move to styled
export const Project = ({ project }: { project: ProjectBody }) => {
  console.log(project.categories[0].color);
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
      <Typography style={{ overflow: "auto" }}>{project.content}</Typography>
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
    </StyledProjectContainer>
  );
};
