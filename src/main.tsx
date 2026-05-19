import React from "react";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta name="robots" content="index, follow" />
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
