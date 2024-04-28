import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app.css";

/**
 * This is the main entry point of the react application.
 *
 * This file imports the `App` component and renders it inside the `root` element of the HTML document. It also imports the global CSS file.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
