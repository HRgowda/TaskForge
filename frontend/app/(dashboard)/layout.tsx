"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import { BACKEND_URL } from "@/app/config";
import { FiLogOut, FiHome, FiPlusCircle, FiZap, FiFileText } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20">
        <div className="backdrop-blur-lg rounded-full mx-auto max-w-7xl">
          <div className="flex justify-between p-4">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/home")}
            >
              <FiZap className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold text-gray-100 hover:text-blue-500 transition-all duration-300">
                TaskForge
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-x-10 flex items-center hidden sm:flex">
              <Button
                variant="ghost"
                onClick={() => router.push("/home")}
                className="text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                <FiHome className="text-lg" />
                <span>Home</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/zap/create")}
                className="text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                <FiPlusCircle className="text-lg" />
                <span>Create</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/docs")}
                className="text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
              >
                <FiFileText className="text-lg" />
                <span>Docs</span>
              </Button>
            </div>

            {/* Logout Button (always visible) */}
            <Button
              onClick={handleLogout}
              className="text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              <FiLogOut className="mr-2 text-lg" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area (will scroll behind the navbar) */}
      <main className="flex-1 overflow-y-auto pt-20 px-4 bg-[#121212]">{children}</main>

      {/* Profile Modal */}
      {isProfileModalOpen && user && (
        <div className="fixed top-16 right-4 z-20 transform transition-all duration-300">
          <ProfileCard user={user} onClose={closeProfileCard} />
        </div>
      )}
    </div>
  );
}
