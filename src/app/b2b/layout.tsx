import type React from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import "@/app/global.css";

export const metadata: Metadata = {
  title: "Observr - b2b",
  description: "Get transparent, AI-synthesized reports from public data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Link Satoshi font from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
