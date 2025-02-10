"use client";

import { Zap, Workflow, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Automation",
    description: "Automate GitHub issue bounty distribution with ease."
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Build complex automation workflows tailored to your specific needs."
  },
  {
    icon: Clock,
    title: "Time Saving",
    description: "Save hours every week by automating your repetitive tasks."
  }
];

export function Features() {
  return (
    <div className="pt-20 bg-[#121212]" id="features">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white/90 to-gray-600 bg-clip-text text-transparent">
            Everything you need to automate your work
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Powerful features to help you work smarter, not harder
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 ">
          {features.map((feature: any, index: number) => (
            <div key={index} className="relative group  ">
              <div className="absolute -inset-2 border border-white rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center p-6">
                <div className="rounded-2xl bg-primary/10 p-4 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl text-white font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}