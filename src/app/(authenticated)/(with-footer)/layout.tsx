import React from "react";
import { Footer } from "@/components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
