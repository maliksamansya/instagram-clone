import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
// import "@mantine/core/styles.css";
import "./index.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";
import AuthProvider from "./context/AuthContext.tsx";
import QueryProvider from "./lib/react-query/queryProvider.tsx";

const theme = createTheme({
  /** Your theme override here */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <QueryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
