"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="text-white relative overflow-hidden pt-36 bg-[#121212]">
      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Automate your work with
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> TaskForge</span>
            </span>
          </h1>
          <p className="mt-14 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            An automated bounty distribution application for GitHub issues, ensuring seamless validation and reward transfers without manual intervention.
          </p>
          <div className="mt-14 flex items-center justify-center">
            <Link href={"/auth/signup"}>
              <Button 
                size="lg" 
                className="gap-2 border-b px-6 py-3 rounded-lg text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-600 shadow-lg transition-all duration-800 ease-in-out"
              >
                Start for free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
