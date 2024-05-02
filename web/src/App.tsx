import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import "./router";
import router from "./router";


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}