"use client";

import { Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#121212] text-white min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About TaskForge</h1>
        <p className="text-lg text-gray-400 text-center mb-24 mt-16">
          TaskForge is an innovative platform designed to automate the bounty distribution process for GitHub issues. With seamless integration, it allows users to easily submit bounty details, ensuring that developers and contributors are rewarded promptly without any manual intervention
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our mission is to streamline the bounty process for open-source contributions. By automating bounty distribution, we aim to simplify the reward system and empower developers to focus on innovation rather than administrative tasks.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose TaskForge?</h2>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-3">
              <li>Automated bounty distribution with no manual intervention</li>
              <li>Easy submission and validation of bounty details</li>
              <li>Instant payment to contributors upon issue completion</li>
              <li>Fully integrated with GitHub for seamless workflow</li>
              <li>Secure and transparent transaction handling</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center gap-4">
            <Shield className="h-10 w-10 text-gray-400" />
            <span className="text-xl font-semibold">TaskForge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
