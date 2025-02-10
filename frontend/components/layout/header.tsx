"use client";

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="text-white fixed top-0 left-0 right-0 z-50 bg-[#121212] backdrop-blur-md border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-semibold">TaskForge</span>
          </div> 
          <div className="flex items-center gap-4">
            {/* Log in Button */}
            <Link href="/auth/signin">
              <Button
                variant="ghost"
                size="sm"
                className="border border-transparent hover:border-gray-400 hover:text-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Log in
              </Button>
            </Link>
            {/* Start Free Button */}
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-b border-transparent hover:from-blue-600 hover:to-indigo-500 shadow-lg rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
