import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="457739220877-voqkka0qe115j84ugooe29ats9af07gs.apps.googleusercontent.com">
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </GoogleOAuthProvider>
  </StrictMode>
);
