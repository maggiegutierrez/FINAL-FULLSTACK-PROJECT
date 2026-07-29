import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import { SavedJobsProvider } from "./context/SavedJobsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SavedJobsProvider>
        <App />
      </SavedJobsProvider>
    </BrowserRouter>
  </StrictMode>,
);
