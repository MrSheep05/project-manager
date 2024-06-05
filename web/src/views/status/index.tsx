import { HexColorPicker } from "react-colorful";
import useAdminRoute from "../../hooks/useAdminRoute";
import { StyledCircle, StyledColumn, StyledRow, StyledStatus } from "./styled";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";

const Status = () => {
  useAdminRoute();
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("Status");

  return (
    <StyledRow>
      <StyledColumn flex="2"></StyledColumn>
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
                style={{ textShadow: "1px 1px black", fontSize: "2em" }}
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
