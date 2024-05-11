import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "dark",
    primary: {
      main: "#2f3640",
      light: "#f5f6fa",
      dark: "#2f3640",
    },
    secondary: {
      main: "#192a56",
      light: "#273c75",
      dark: "#192a56",
    },
    success: {
      main: "#16a085",
      light: "#1abc9c",
      dark: "#16a085",
    },
    error: {
      main: "#c0392b",
      light: "#e74c3c",
      dark: "#c0392b",
    },
    info: {
      main: "#2980b9",
      light: "#3498db",
      dark: "#2980b9",
    },
    warning: {
      main: "#f39c12",
      light: "#f1c40f",
      dark: "#f39c12",
    },
  },
});

export default theme;
