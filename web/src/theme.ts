import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 10,
  palette: {
    primary: {
      main: "#2f3640",
      light: "#f5f6fa",
    },
    secondary: {
      main: "#192a56",
      light: "#273c75",
    },
    success: {
      main: "#16a085",
      light: "#1abc9c",
    },
    error: {
      main: "#c0392b",
      light: "#e74c3c",
    },
    info: {
      main: "#2980b9",
      light: "#3498db",
    },
    warning: {
      main: "#f39c12",
      light: "#f1c40f",
    },
  },
});

export default theme;
