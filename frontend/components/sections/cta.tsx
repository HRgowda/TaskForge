"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CTA() {

  const router = useRouter();

  return (
    <div className="bg-[#121212] relative isolate p-20  lg:px-8">
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to save time?
          <br />
          Start automating today.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
          Join thousands of professionals who use TaskForge to automate their work and focus on what matters most.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
      </div>
    </div>
  </div>
  );
}