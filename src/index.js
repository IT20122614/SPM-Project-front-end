import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards/es/styles-compiled.css";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
