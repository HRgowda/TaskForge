"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {

  return (
    <div className="relative overflow-hidden pt-48">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Automate your work with
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> TaskForge</span>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          An application to automate tasks and connect your favorite tools seamlessly.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link href={"/auth/signup"}>
              <Button size="lg" className="gap-2">
                Start for free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-6 text-sm">
          </div>
        </div>
      </div>
    </div>
  );
}