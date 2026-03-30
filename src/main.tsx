import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CartProvider } from "@/components/providers/cart-provider";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CustomerAuthProvider } from "@/lib/context/CustomerAuthContext";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import App from "./App";
import "./globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScrollProvider>
          <AuthProvider>
            <CustomerAuthProvider>
              <CartProvider>
                <App />
                <CartSidebar />
              </CartProvider>
            </CustomerAuthProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

