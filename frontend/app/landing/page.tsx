"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
// import { Integrations } from "@/components/sections/integrations";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}