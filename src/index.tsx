import React from "react";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/home";
import "@fontsource/public-sans";
import { CssVarsProvider, getInitColorSchemeScript } from "@mui/joy/styles";

import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

getInitColorSchemeScript({
  defaultMode: "dark",
});

root.render(
  <CssVarsProvider defaultMode={"dark"}>
    <Home />
  </CssVarsProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
