import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import toast from "react-hot-toast";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/index.css";

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
      const responseMessage = error?.response?.data?.message;

      toast.error(
        `Error: ${error.message} \n\nMessage: ${responseMessage || "None"}`,
      );
    },
  }),
  mutationCache: new MutationCache({
    // global error handling for useMutation
    onError: (error) => {
      const responseMessage = error?.response?.data?.message;

      toast.error(
        `Error: ${error.message} \n\nMessage: ${responseMessage || "None"}`,
      );
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
