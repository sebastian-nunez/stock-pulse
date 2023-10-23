import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";

// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // global error handling for useQuery
    onError: (error) => {
      const message = error?.response?.data?.message;

      console.error(message);
      toast.error(`Error: ${error.message}. \n\nDetails: ${message}`);
    },
  }),
  mutationCache: new MutationCache({
    // global error handling for useMutation
    onError: (error) => {
      const message = error?.response?.data?.message;

      console.error(message);
      toast.error(`Error: ${error.message}. \n\nDetails: ${message}`);
    },
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
