"use client";

import { usePathname } from "next/navigation";

import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Maintenance page should not show the normal website layout
  if (pathname === "/maintenance") {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main className="flex-grow w-full">
        {children}
      </main>

      <Footer />
    </>
  );
}