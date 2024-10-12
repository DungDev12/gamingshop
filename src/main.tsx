import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persist } from "./store/store.ts";
import "@mantine/core/styles.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <BrowserRouter>
          <MantineProvider>
            <App />
          </MantineProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
