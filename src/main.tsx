import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importing the SDK starts the handshake with the storefront's shell.
import "@fluid-app/sites";

import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
