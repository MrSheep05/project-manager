import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "light",
    primary: {
      main: "#2f3640",
      light: "#F6F4F3",
      // dark: "#2f3640",
    },
    shadow: {
      main: "#FFFFFF",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#192a56",
      light: "#273c75",
      // dark: "#192a56",
    },
    success: {
      main: "#1abc9c",
      // main: "#16a085",
      light: "#1abc9c",
      // dark: "#16a085",
    },
    error: {
      // main: "#c0392b",
      main: "#e74c3c",
      light: "#e74c3c",
      // dark: "#c0392b",
    },
    info: {
      // main: "#2980b9",
      main: "#3498db",
      light: "#3498db",
      // dark: "#2980b9",
    },
    warning: {
      // main: "#f39c12",
      main: "#f1c40f",
      light: "#f1c40f",
      // dark: "#f39c12",
    },
  },
});

export default theme;
