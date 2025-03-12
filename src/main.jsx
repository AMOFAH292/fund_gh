import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CampaignProvider } from "./contexts/CampaignContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CampaignProvider>
      <App />
    </CampaignProvider>
  </AuthProvider>
);
