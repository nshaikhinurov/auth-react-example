import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { AppRouter } from "./routers";
import { QueryProvider } from "./providers/query-provider";
import { ToastProvider } from "./providers/toast-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { Layout } from "~/widgets/layout";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastProvider>
            <Layout>
              <AppRouter />
            </Layout>
          </ToastProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
