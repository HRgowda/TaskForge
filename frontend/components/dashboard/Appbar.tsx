"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function AppBar() {
  const router = useRouter();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-10 border-b bg-white",
        "h-16 flex items-center shadow-sm"
      )}
    >
      <div className="w-full flex justify-between items-center px-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-xl font-bold">TaskForge</span>
        </div>

        {/* Button Section */}
        <div className="space-x-4">
          <Button variant="ghost">
            Profile
          </Button>
          <Button variant="ghost">
            Settings
          </Button>
          <Button onClick={() => {
            localStorage.removeItem("token")
            router.push("/auth/signin")
          }}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
