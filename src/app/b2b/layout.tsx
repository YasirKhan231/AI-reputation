import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Observr - B2B",
  description: "Get transparent, AI-synthesized reports from public data",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Satoshi from Fontshare for B2B only */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Satoshi, sans-serif" }}>
        {/* <Header /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
