import { DM_Serif_Display, Nunito } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";
import { Metadata } from "next";

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

import { CartProvider } from "@/components/providers/cart-provider";
import { CartSidebar } from "@/components/ui/cart-sidebar";

export const metadata: Metadata = {
  title: "Tender Cradle — Childcare That Truly Cares",
  description:
    "Tender Cradle provides safe, nurturing, and structured childcare services. After-school care, creative programs, and holistic child development.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerif.variable} ${nunito.variable} font-sans antialiased`}
      >
        <SmoothScrollProvider>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
