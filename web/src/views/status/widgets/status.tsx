import { IconButton, Typography } from "@mui/material";
import { CategoryOrStatusBody } from "../../../utils/types";
import {
  StyledStatusContainer,
  StyledStatusPreview,
  StyledSwitch,
  StyledToRight,
} from "./styled";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { WebsocketState } from "../../../hooks/websocket";
import { SendAction } from "../../../hooks/websocket/types";
type StatusWidgetProps = {
  status: CategoryOrStatusBody;
  edit: (status: CategoryOrStatusBody) => void;
};

const StatusWidget = ({ edit, status }: StatusWidgetProps) => {
  const { send } = useContext(WebsocketState);
  const visible = Boolean(status.visible);
  return (
    <StyledStatusContainer
      style={
        !visible
          ? {
              boxShadow: `inset 0 0 0 1000px #00000033`,
            }
          : undefined
      }
    >
      <StyledStatusPreview color={status.color}>
        <Typography color={status.color}>{status.name}</Typography>
      </StyledStatusPreview>
      <IconButton>
        <EditIcon />
      </IconButton>
      <StyledToRight>
        <StyledSwitch
          value={visible}
          checked={visible}
          onChange={(_) =>
            send(
              !visible
                ? {
                    action: SendAction.AddStatus,
                    payload: { color: status.color, name: status.name },
                  }
                : {
                    action: SendAction.RemoveStatus,
                    payload: { id: status.id },
                  }
            )
          }
        />
      </StyledToRight>
    </StyledStatusContainer>
  );
};

export default StatusWidget;
