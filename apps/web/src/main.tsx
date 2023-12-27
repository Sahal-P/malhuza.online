// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Provider from "./redux/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import React from "react";
import { ThemeProvider } from "./components/common/ThemeProvider.tsx";

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="ui-theme">
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
