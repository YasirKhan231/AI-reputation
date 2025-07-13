import type { ReactNode } from "react";
import type { Metadata } from "next";
import Head from "next/head"; // ✅ Use for meta/font inside nested layout
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
    <div style={{ fontFamily: "Satoshi, sans-serif" }}>
      <Head>
        {/* ✅ Load Satoshi for B2B layout only */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
}
