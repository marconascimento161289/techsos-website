import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tech SOS | Reparação de Telemóveis e Consolas em Lisboa",
    template: "%s | Tech SOS"
  },
  description: "Especialistas em reparação avançada de telemóveis, manutenção de consolas PS5/Xbox e venda de eletrónicos premium. Localizado em Alvalade, Lisboa.",
  keywords: ["reparação de telemóveis", "reparar iphone lisboa", "manutenção ps5", "limpeza consolas", "venda de iphones", "tech sos", "alvalade"],
  authors: [{ name: "Tech SOS" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://meu-site-rose-three.vercel.app/",
    title: "Tech SOS | Reparação Especializada de Tecnologia",
    description: "Dê uma nova vida aos seus equipamentos. Reparações na hora com técnicos certificados.",
    siteName: "Tech SOS",
  },
};

import { ChatWidget } from "@/components/chat/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
