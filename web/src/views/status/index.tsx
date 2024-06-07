import { HexColorPicker } from "react-colorful";
import useAdminRoute from "../../hooks/useAdminRoute";
import {
  StyledCircle,
  StyledColumn,
  StyledColumnList,
  StyledRow,
  StyledStatus,
} from "./styled";
import { useContext, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { WebsocketState } from "../../hooks/websocket";
import StatusWidget from "./widgets/status";
import { CategoryOrStatusBody } from "../../utils/types";

const Status = () => {
  useAdminRoute();
  const { state } = useContext(WebsocketState);
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("Status");

  return (
    <StyledRow>
      <StyledColumn flex="2">
        <StyledColumnList>
          {state.status.map((status) => (
            <StatusWidget status={status} edit={(_) => {}} key={status.id} />
          ))}
        </StyledColumnList>
      </StyledColumn>
      <StyledColumn>
        <StyledRow justifyContent={"space-around !important"}>
          <HexColorPicker color={color} onChange={setColor} />
          <StyledColumn flex="1">
            <TextField
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
            <StyledRow
              justifyContent={"space-evenly !important"}
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
            </StyledRow>
          </StyledColumn>
        </StyledRow>
      </StyledColumn>
    </StyledRow>
  );
};

export default Status;
