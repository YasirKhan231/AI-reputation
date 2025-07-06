import type React from "react";
import type { Metadata } from "next";
import Header from "../components/header";
import "./globals.css";

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
      <body>
        <Header />
        <div className="main-content">{children}</div>
      </body>
    </html>
  );
}
