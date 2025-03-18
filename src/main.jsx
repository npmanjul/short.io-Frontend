import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import toast, { Toaster } from "react-hot-toast";
import StoreProvider from "./context/Store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </StoreProvider>
  </StrictMode>
);
