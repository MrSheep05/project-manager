import {
  ButtonBase,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ProjectBody } from "../../../utils/types";
import {
  StyledCategory,
  StyledProjectContainer,
  StyledRow,
  StyledStatus,
  StyledTitle,
} from "./styled";
import { useContext, useState } from "react";
import { WebsocketState } from "../../../hooks/websocket";
import { FaEyeSlash } from "react-icons/fa";
import { SendAction } from "../../../hooks/websocket/types";

//TODO Filip move to styled
export const Project = ({
  project,
  setIsScrolling,
}: {
  project: ProjectBody;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    state: { uid, status },
    send,
  } = useContext(WebsocketState);
  const [timeout, setTimeoutS] = useState<NodeJS.Timeout | undefined>();
  const statusToDisplay = [...status];
  const index = statusToDisplay.findIndex(({ id }) => id === project.status.id);
  index >= 0
    ? (statusToDisplay[index] = project.status)
    : statusToDisplay.push(project.status);
  return (
    <StyledProjectContainer>
      <StyledRow key={project.id}>
        <StyledTitle>{project.title}</StyledTitle>
        {project.categories.map((category) => (
          <StyledCategory color={category.color} key={category.id}>
            <Typography color="white">{category.name}</Typography>
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

        <StyledStatus
          style={{
            border: `1px solid ${project.status.color}`,
            textAlign: "right",
          }}
          value={project.status.id}
          IconComponent={() => null}
          onChange={({ target }) =>
            send({
              action: SendAction.UpdateProject,
              payload: {
                statusId: target.value as string,
                projectId: project.id,
              },
            })
          }
        >
          {statusToDisplay
            .sort((a) => (a.visible ? -1 : 1))
            .map((status) => (
              <MenuItem
                key={status.id}
                value={status.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Typography color={status.color}>{status.name}</Typography>
              </MenuItem>
            ))}
        </StyledStatus>
      </StyledRow>
      {project.user_id !== uid ? (
        <Typography>{`Created by ${project.user_email}`}</Typography>
      ) : null}
    </StyledProjectContainer>
  );
};
