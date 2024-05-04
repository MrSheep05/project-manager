import "./App.css";
import "./routes/router";
import { ThemeProvider } from "@emotion/react";
import { experimental_extendTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { AppStateComponent } from "./hooks/app-state";
import router from "./routes/router";

const App = () => {
  return (
    <AppStateComponent>
      <ThemeProvider theme={experimental_extendTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppStateComponent>
  );
};

export default App;
