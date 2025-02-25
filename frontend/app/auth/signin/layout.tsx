import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Left Section: Hidden on Small Screens, Visible on Medium and Larger */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center relative">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-2/4 bg-gradient-to-br from-blue-700 via-transparent to-transparent opacity-50"></div>
        
        {/* Content */}
        <div className="text-white p-12 space-y-6 relative z-10">
          <div className="font-semibold text-2xl text-blue-500">
            Log In to Continue
          </div>
          <div className="font-semibold mt-6 text-5xl leading-tight">
            Access your account and get back to your tasks.
          </div>
        </div>
      </div>

      {/* Right Section: Full Width on Small Screens, Half on Larger Screens */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-4/5">
          {children}
        </div>
      </div>
    </div>
  );
}
