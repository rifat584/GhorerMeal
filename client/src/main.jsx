import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getTheme, setTheme } from "./utilitis/theme.js";

const queryClient = new QueryClient();

setTheme(getTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3200,
            style: {
              borderRadius: "1.5rem",
              border: "1px solid var(--color-base-300)",
              background: "var(--color-base-100)",
              color: "var(--color-base-content)",
              boxShadow: "0 18px 45px rgba(40, 29, 19, 0.12)",
              padding: "14px 16px",
            },
            success: {
              iconTheme: {
                primary: "var(--color-primary)",
                secondary: "var(--color-base-100)",
              },
            },
            error: {
              duration: 3800,
              iconTheme: {
                primary: "var(--color-error)",
                secondary: "var(--color-base-100)",
              },
            },
            loading: {
              iconTheme: {
                primary: "var(--color-secondary)",
                secondary: "var(--color-base-100)",
              },
            },
          }}
        />
      </AuthProvider>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
