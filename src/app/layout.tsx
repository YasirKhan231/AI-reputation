import type React from "react";
import type { Metadata } from "next";
import Header from "../components/header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Observr - Make People Decisions with Confidence",
  description: "Get transparent, AI-synthesized reports from public data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        {children}
        {/* <div className="main-content">{children}</div> */}
      </body>
    </html>
  );
}
