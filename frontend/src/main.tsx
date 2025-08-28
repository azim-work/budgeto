import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SettingsProvider } from "./context/SettingsContext.tsx";
import { Toaster } from "react-hot-toast";
import { ExpensesProvider } from "./context/ExpensesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <ExpensesProvider>
        <App />
        <Toaster position="top-center" />
      </ExpensesProvider>
    </SettingsProvider>
  </React.StrictMode>
);
