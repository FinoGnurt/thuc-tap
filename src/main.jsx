import "@/Styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { LoadingProvider } from "./contexts/LoadingProvider";
import { UserProvider } from "./contexts/UserProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/thuc-tap">
      <UserProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
