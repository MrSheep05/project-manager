import { HexColorPicker } from "react-colorful";
import useAdminRoute from "../../hooks/useAdminRoute";
import {
  StyledCircle,
  StyledColumn,
  StyledColumnList,
  StyledRow,
  StyledRowCard,
  StyledStatus,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { WebsocketState } from "../../hooks/websocket";
import StatusWidget from "./widgets/status";
import { CategoryOrStatusBody } from "../../utils/types";
import { Cancel } from "@mui/icons-material";
import { SendAction } from "../../hooks/websocket/types";

const Status = () => {
  useAdminRoute();
  const { send } = useContext(WebsocketState);

  const { state } = useContext(WebsocketState);
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("Status");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) return;
    clear();
  }, [isEditing]);

  const clear = () => {
    setColor("#aabbcc");
    setName("Status");
  };

  const edit = (status: CategoryOrStatusBody) => {
    setColor(status.color);
    setName(status.name);
    setIsEditing(true);
  };
  return (
    <StyledRow>
      <StyledColumn flex="2">
        <StyledColumnList>
          {state.status.map((status) => (
            <StatusWidget status={status} edit={edit} key={status.id} />
          ))}
        </StyledColumnList>
      </StyledColumn>
      <StyledColumn>
        <StyledRow justifyContent={"space-around !important"}>
          <StyledColumn>
            <StyledRow>
              {isEditing ? (
                <IconButton onClick={() => setIsEditing(false)}>
                  <Cancel />
                </IconButton>
              ) : undefined}
            </StyledRow>
            <HexColorPicker color={color} onChange={setColor} />
          </StyledColumn>
          <StyledColumn flex="1">
            <TextField
              disabled={isEditing}
              value={name}
              onChange={({ target }) => setName(target.value)}
            ></TextField>
            <StyledRow>
              <StyledCircle bgcolor={color} />
              <Typography
                color={color}
                style={{
                  textShadow: "1px 1px black",
                  fontSize: "2em",
                  width: "15vmin",
                }}
              >
                {color}
              </Typography>
            </StyledRow>
            <StyledRowCard
              style={{
                backgroundColor: "white",
                padding: "1vmin",
                borderRadius: "2vmin",
              }}
            >
              <Typography color="black">{"Podgląd"}</Typography>
              <StyledStatus color={color}>
                <Typography>{name.length > 0 ? name : "Status"}</Typography>
              </StyledStatus>
            </StyledRowCard>
            <Button
              onClick={() => {
                send({
                  action: SendAction.AddStatus,
                  payload: { color, name },
                });
                clear();
                setIsEditing(false);
              }}
            >
              {isEditing ? "Edytuj" : "Dodaj"}
            </Button>
          </StyledColumn>
        </StyledRow>
      </StyledColumn>
    </StyledRow>
  );
};

export default Status;
