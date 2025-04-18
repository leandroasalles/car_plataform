import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./App.tsx";
import AuthProvider from "./context";

import { RouterProvider } from "react-router-dom";

import { register } from "swiper/element/bundle";
import { Toaster } from "react-hot-toast";

register();
import "swiper/swiper-bundle.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </StrictMode>
);
