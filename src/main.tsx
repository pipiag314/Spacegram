import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.tsx";
import { QueryProvider } from "./lib/query/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
