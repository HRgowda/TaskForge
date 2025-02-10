"use client";

import { Shield } from "lucide-react";

const footerLinks = {
  Product: ['Features', 'Integrations'],
  Company: ['About', 'Blog'],
  Resources: ['Documentation', 'Contact'],
  Legal: ['Privacy', 'T&C'],
};

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]): any => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link: any) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
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