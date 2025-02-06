"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <Link href="/" className="flex items-center mb-4 group space-x-2">
        <div className="flex p-2 rounded-xl /50 backdrop-blur-sm group-hover:/80 transition-colors">
          <Shield className="h-8 w-8 text-primary text-white hover:scale-105" />
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-white">
          TaskForge
        </span>
        </div>
        
      </Link>
      
      <div className="text-white w-full max-w-md">
        <div className="px-8 py-4 ">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold">
              {title}
            </h1>
            <p className="mt-2 text-sm">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}