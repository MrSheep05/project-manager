import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import "./routes/router";
import router from "./routes/router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
