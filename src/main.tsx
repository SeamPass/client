import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          style: {
            background: "#4CAF50",
            color: "#FFFFFF",
          },
        },
        error: {
          style: {
            background: "#EFEFEF",
            color: "#BE2921",
          },
        },
      }}
    />
  </React.StrictMode>
);
