import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/auth/AuthContext";
import { router } from "@/router";
import "./styles.css";
import { I18nProvider } from "./i18n/i18nProvider";

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </AuthProvider>
  </StrictMode>,
);
