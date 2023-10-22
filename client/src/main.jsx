import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";

// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // global error handling
    onError: (error) => toast.error(`Error: ${error.message}`),
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
