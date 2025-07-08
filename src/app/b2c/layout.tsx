import type React from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import "@/app/globals.css";

// Import Geist font (you can install it via `npm install geist`)
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Observr - B2C",
  description: "Get transparent, AI-synthesized reports from public data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
