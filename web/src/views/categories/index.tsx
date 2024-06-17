import { HexColorPicker } from "react-colorful";
import useAdminRoute from "../../hooks/useAdminRoute";
import {
  StyledCircle,
  StyledColumn,
  StyledColumnList,
  StyledRow,
  StyledRowCard,
  StyledCategory,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { WebsocketState } from "../../hooks/websocket";
import { CategoryOrStatusBody } from "../../utils/types";
import { Cancel } from "@mui/icons-material";
import { SendAction } from "../../hooks/websocket/types";
import CategoryWidget from "./widgets/category";

const Category = () => {
  useAdminRoute();
  const { send } = useContext(WebsocketState);

  const { state } = useContext(WebsocketState);
  const [color, setColor] = useState("#aabbcc");
  const [name, setName] = useState("Kategoria");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) return;
    clear();
  }, [isEditing]);

  const clear = () => {
    setColor("#aabbcc");
    setName("Kategoria");
  };

  const edit = (category: CategoryOrStatusBody) => {
    setColor(category.color);
    setName(category.name);
    setIsEditing(true);
  };

  return (
    <StyledRow>
      <StyledColumn flex="2">
        <StyledColumnList>
          {state.categories.map((category) => (
            <CategoryWidget category={category} edit={edit} key={category.id} />
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
              <StyledCategory color={color}>
                <Typography color="white">
                  {name.length > 0 ? name : "Kategoria"}
                </Typography>
              </StyledCategory>
            </StyledRowCard>
            <Button
              onClick={() => {
                send({
                  action: SendAction.AddCategory,
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

export default Category;
