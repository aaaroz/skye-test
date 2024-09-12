import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToggleFetchDataContextProvider from "./context/toggle-fetch-data/toggle-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToggleFetchDataContextProvider>
      <App />
    </ToggleFetchDataContextProvider>
  </StrictMode>
);
