import type { ReactNode } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import ClientLayout from "./ClientLayout";
import "@/app/globals.css";

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
