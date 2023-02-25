import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
