import { IconButton, Typography } from "@mui/material";
import { CategoryOrStatusBody } from "../../../utils/types";
import {
  StyledCategoryPreview,
  StyledCategoryContainer,
  StyledSwitch,
  StyledToRight,
} from "./styled";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { WebsocketState } from "../../../hooks/websocket";
import { SendAction } from "../../../hooks/websocket/types";
type CategoryWidgetProps = {
  category: CategoryOrStatusBody;
  edit: (category: CategoryOrStatusBody) => void;
};

const CategoryWidget = ({ edit, category }: CategoryWidgetProps) => {
  const { send } = useContext(WebsocketState);
  const visible = Boolean(category.visible);
  return (
    <StyledCategoryContainer
      style={
        !visible
          ? {
              boxShadow: `inset 0 0 0 1000px #00000033`,
            }
          : undefined
      }
    >
      <StyledCategoryPreview color={category.color}>
        <Typography color="white">{category.name}</Typography>
      </StyledCategoryPreview>
      {!category.visible ? (
        <IconButton onClick={() => edit(category)}>
          <EditIcon />
        </IconButton>
      ) : undefined}
      <StyledToRight>
        <StyledSwitch
          value={visible}
          checked={visible}
          onChange={(_) =>
            send(
              !visible
                ? {
                    action: SendAction.AddCategory,
                    payload: { color: category.color, name: category.name },
                  }
                : {
                    action: SendAction.RemoveCategory,
                    payload: { id: category.id },
                  }
            )
          }
        />
      </StyledToRight>
    </StyledCategoryContainer>
  );
};

export default CategoryWidget;
