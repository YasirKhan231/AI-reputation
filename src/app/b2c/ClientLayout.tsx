"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import type { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const shouldShowHeader = pathname !== "/b2c/newprofile";

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
