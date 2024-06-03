import React, { useContext, useState } from "react";
import { StyledAddProject } from "../styled";
import { WebsocketState } from "../../../hooks/websocket";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Button,
  Alert,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { SendAction, SendFn } from "../../../hooks/websocket/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function addProjectButton(
  send: SendFn,
  statusId: string,
  categorieId: string[],
  title: string,
  content: string
) {
  send({
    action: SendAction.AddProject,
    payload: {
      statusId: statusId,
      categoriesIds: categorieId,
      title: title,
      content: content,
    },
  });
}

function getStyles(name: string, categorieName: string[], theme: Theme) {
  return {
    fontWeight:
      categorieName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddProject = () => {
  const { isAvailable, send, state } = useContext(WebsocketState);
  const categories = state.categories;
  const statuses = state.status;
  const theme = useTheme();
  const [categorieName, setCategorieName] = useState<string[]>([]);
  const [statusName, setStatusName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setCpntent] = React.useState("");

  const handleChangemultiple = (
    event: SelectChangeEvent<typeof categorieName>
  ) => {
    const {
      target: { value },
    } = event;
    setCategorieName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatusName(event.target.value as string);
  };

  const handleChangeTitle = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCpntent(event.target.value);
  };

  return (
    <StyledAddProject>
      <TextField
        label="Title"
        variant="standard"
        color="info"
        value={title}
        onChange={handleChangeTitle}
        fullWidth
      />
      <TextField
        label="Content"
        multiline
        rows={4}
        variant="outlined"
        color="info"
        value={content}
        onChange={handleChangeContent}
        fullWidth
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="label-categories" color="info">
          Categories
        </InputLabel>
        <Select
          color="info"
          labelId="label-categories"
          multiple
          value={categorieName}
          onChange={handleChangemultiple}
          input={<OutlinedInput label="Categories" />}
          MenuProps={MenuProps}
        >
          {categories.map((categorie) => (
            <MenuItem
              key={categorie.name}
              value={categorie.id}
              style={getStyles(categorie.name, categorieName, theme)}
            >
              {categorie.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-label" color="info">
          Status
        </InputLabel>
        <Select
          labelId="select-label"
          value={statusName}
          label="Status"
          onChange={handleChange}
          color="info"
        >
          {statuses.map((status) => (
            <MenuItem key={status.name} value={status.id}>
              {status.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(!content || !title) && (
        <Alert severity="error">Wypełnij wszystkie pola</Alert>
      )}
      <Button
        variant="outlined"
        color="info"
        fullWidth
        disabled={!title || !content}
        onClick={() => {
          if (title === "" || content === "") {
            return;
          }
          addProjectButton(send, statusName, categorieName, title, content);
        }}
      >
        Add Project
      </Button>
    </StyledAddProject>
  );
};

export default AddProject;
