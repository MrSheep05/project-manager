import { Typography } from "@mui/material";
import { ProjectBody } from "../../../utils/types";
import {
  StyledCategory,
  StyledProjectContainer,
  StyledRow,
  StyledTitle,
} from "./styled";

export const Project = ({ project }: { project: ProjectBody }) => {
  console.log(project.categories[0].color);
  return (
    <StyledProjectContainer>
      <StyledRow>
        <StyledTitle>{project.title}</StyledTitle>
        {project.categories.map((category) => (
          <StyledCategory color={category.color} key={category.id}>
            <Typography color={category.color}>{category.name}</Typography>
          </StyledCategory>
        ))}
      </StyledRow>
      <Typography>{project.content}</Typography>
    </StyledProjectContainer>
  );
};
