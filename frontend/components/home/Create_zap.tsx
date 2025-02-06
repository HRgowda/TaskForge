"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight, Sparkles, Book } from "lucide-react";

export function CreateZap() {
  const router = useRouter();

  return (
    <div className="relative z-10">
      <div className="bg-[#121212] text-white p-4">
        {/* Header Section */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center rounded-full bg-purple-600/20 px-4 py-1 text-sm font-medium text-purple-400 mb-6">
            <Sparkles className="h-5 w-5 mr-2" />
            Start Automating Today
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Create your first
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {" "}automation
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Transform your workflow with powerful automation. Connect your GitHub and let TaskForge handle the rest.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center justify-center mb-8">
          {/* Image Section */}
          <div className="relative group flex justify-center">
            <Image
              src="/automation.jpg"
              alt="Automation"
              width={350}
              height={300}
              className="transform rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Features List */}
          <div className="space-y-6 flex justify-center flex-col items-start">
            <h3 className="text-xl font-semibold text-white">Why automate?</h3>
            <ul className="space-y-4 text-left">
              {["Automate bounty distribution for GitHub issues", "Eliminate manual intervention and save time", "Ensure accurate and seamless bounty transfers", "Focus on streamlining your workflow and scaling effortlessly"].map(
                (feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={() => router.push("/zap/create")}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-white font-semibold text-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Create your first automation
            <ArrowRight className="ml-2 h-5 w-5 inline-block transform group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors justify-start">
                <Book className="h-4 w-4" />
                <a href="/docs" className="text-sm font-medium">
                  Learn more about automations in our documentation
                </a>
              </div>
        </div>
      </div>
    </div>
  );
}
