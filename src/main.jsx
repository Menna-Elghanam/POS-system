import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "./context/CartContext";
import './axiosConfig.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NextUIProvider>
  </StrictMode>
);
