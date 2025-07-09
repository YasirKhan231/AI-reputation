import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Observr - B2C",
  description: "Get transparent, AI-synthesized reports from public data",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
