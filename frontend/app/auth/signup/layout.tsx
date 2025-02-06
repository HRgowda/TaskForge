// layout.tsx

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#121212] relative">
      {/* Sunlight Gradient at the Top Left */}
      <div className="absolute top-0 left-0 w-full h-2/4 bg-gradient-to-br from-blue-700 via-transparent to-transparent opacity-50"></div>

      {/* Left Section: Design */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-white p-12 space-y-6 relative z-10">
          <div className="font-semibold text-2xl text-blue-500">
            Welcome to Your Journey
          </div>
          <div className="font-semibold mt-6 text-5xl">
            Kickstart your journey by creating an account today!
          </div>
        </div>
      </div>

      {/* Right Section: Rendered Children */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-4/5">
          {children}
        </div>
      </div>
    </div>
  );
}
