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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <Link href="/" className="flex items-center mb-4 group">
        <div className="p-2 rounded-xl bg-white/50 backdrop-blur-sm group-hover:bg-white/80 transition-colors">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          TaskForge
        </span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm px-8 py-12 shadow-xl rounded-2xl border border-gray-100">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}