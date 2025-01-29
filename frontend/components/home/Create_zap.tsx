"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight, Sparkles, Book } from "lucide-react";

export function CreateZap() {
  const router = useRouter();

  return (
      <div className="relative z-10">
        <div className="">
          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl">
            {/* Header Section */}
            <div className="mb-6">
              <div className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Automating Today
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                Create your first{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  automation
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Transform your workflow with powerful automation. Connect your Github and let TaskForge handle the rest.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-4">
              {/* Image Section */}
              <div className="relative group">
                {/* <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                <div className="relative">
                  <Image
                    src="/automation.jpg"
                    alt="Automation"
                    width={400}
                    height={300}
                    className="transform group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" /> */}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Why automate?</h3>
                  <ul className="space-y-4">
                    {[
                      "Automate bounty distribution for GitHub issues",
                      "Eliminate manual intervention and save time",
                      "Ensure accurate and seamless bounty transfers",
                      "Focus on streamlining your workflow and scaling effortlessly"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center space-y-8">
              <Button
                onClick={() => router.push("/zap/create")}
                className="group relative px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                Create your first automation
                <ArrowRight className="ml-2 h-5 w-5 inline-block transform group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Help Link */}
              <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Book className="h-4 w-4" />
                <a href="/info/documentation" className="text-sm font-medium">
                  Learn more about automations in our documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}