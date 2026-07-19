import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

const root = document.getElementById("app");

if (!root) throw new Error("App-Container wurde nicht gefunden.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
