"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import { BACKEND_URL } from "@/app/config";
import { FiUser, FiSettings, FiLogOut, FiHome, FiPlusCircle, FiZap, FiMenu } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Fetch logged-in user data when profile modal opens
  useEffect(() => {
    const fetchUserData = async () => {
      if (isProfileModalOpen) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/logged_user`, {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isProfileModalOpen]);

  const closeProfileCard = () => setProfileModalOpen(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-56 lg:w-64 bg-white border-r border-black shadow-lg flex flex-col justify-between p-4 transition-all duration-300 ease-in-out",
          "lg:flex", // Show sidebar on large screens
          isSidebarOpen ? "translate-x-0" : "-translate-x-full", // Toggle sidebar on mobile
          "lg:translate-x-0" // Always visible on large screens
        )}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center cursor-pointer mb-6" onClick={() => router.push("/home")}>
            <FiZap className="text-2xl" />
            <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300">
              TaskForge
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/home")}
              className="w-full flex items-center space-x-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200 rounded-lg"
            >
              <FiHome className="text-lg" />
              <span>Home</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push("/zap/create")}
              className="w-full flex items-center space-x-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200 rounded-lg"
            >
              <FiPlusCircle className="text-lg" />
              <span>Create</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setProfileModalOpen((prev) => !prev)}
              className="w-full flex items-center space-x-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200 rounded-lg"
            >
              <FiUser className="text-lg" />
              <span>Profile</span>
            </Button>

          </nav>
        </div>

        {/* Logout Button */}
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/signin");
          }}
          className="bg-black text-white hover:bg-black/60 w-full rounded-lg py-2 transition duration-200"
        >
          <FiLogOut className="mr-2 text-lg" />
          Logout
        </Button>
      </aside>

      {/* Hamburger Button (Mobile Only) */}
      <button
        className="absolute top-4 left-4 lg:hidden p-2 rounded-md bg-gray-800 text-white shadow-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu className="text-2xl" />
      </button>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:ml-48">{children}</main>

      {/* Profile Modal */}
      {isProfileModalOpen && user && (
        <div className="fixed top-16 right-4 z-20 transform transition-all duration-300">
          <ProfileCard user={user} onClose={closeProfileCard} />
        </div>
      )}

      {/* Sidebar Overlay (for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
