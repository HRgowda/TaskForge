"use client";

import { Shield } from "lucide-react";

const footerLinks = {
  Product: ['Features', 'Integrations'],
  Company: ['About', 'Blog'],
  Resources: ['Documentation', 'Contact'],
  Legal: ['Privacy', 'T&C'],
};

const info = ["About", "Feautres", "Integrations", "Docs", "T&C", "Privacy"]

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between gap-8 lg:gap-12">
          {info.map((link): any => (
            <div key={link}>
              <a href={
                link == "About" ? "/about" : link == "Feautres" ? "/Features" : link == "Integrations" ? "/integrations" : link == "Docs" ? "/docs" : link == "T&C" ? "/t&c" : link == "Privacy" ? "/privacy" : "#"
              } className="font-bold text-white/80 hover:underline bg-clip-text text-transparent">{link}</a>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-semibold">TaskForge</span>
          </div>
          <p className="text-sm text-gray-300">© 2025 TaskForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}