import { RouterProvider } from "react-router-dom";
import { AppStateComponent } from "./hooks/app-state";
import { ThemeProvider } from "@mui/material";
import router from "./routes/router";
import theme from "./theme";
import "./App.css";

const App = () => {
  return (
    <AppStateComponent>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppStateComponent>
  );
};

export default App;
