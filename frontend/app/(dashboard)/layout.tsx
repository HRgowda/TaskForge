"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import { BACKEND_URL } from "@/app/config";
import { FiLogOut, FiHome, FiPlusCircle, FiZap, FiFileText, FiMenu, FiX } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <nav className="fixed top-0 left-0 w-full z-20 bg-transparent">
        <div className="backdrop-blur-lg rounded-lg mx-4 max-w-7xl px-6 sm:px-2 sm:rounded-lg lg:mx-auto">
          <div className="flex justify-between items-center p-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/home")}>  
              <FiZap className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold text-gray-100 hover:text-blue-500 transition-all duration-300">TaskForge</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex space-x-10 items-center">
              <NavLink icon={FiHome} label="Home" href="/home" />
              <NavLink icon={FiPlusCircle} label="Create" href="/zap/create" />
              <NavLink icon={FiPlusCircle} label="Profile" href="/profile" />
              <NavLink icon={FiFileText} label="Docs" href="/docs" />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl text-white" />}
              </Button>
            </div>
            
            {/* Logout Button (Desktop Only) */}
            <Button onClick={handleLogout} className="hidden sm:flex text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg">
              <FiLogOut className="mr-2 text-lg" /> Logout
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="sm:hidden flex flex-col items-center space-y-4 pb-4">
              <NavLink icon={FiHome} label="Home" href="/home" />
              <NavLink icon={FiPlusCircle} label="Create" href="/zap/create" />
              <NavLink icon={FiPlusCircle} label="Profile" href="/profile" />
              <NavLink icon={FiFileText} label="Docs" href="/docs" />
              <Button onClick={handleLogout} className="text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg">
                <FiLogOut className="mr-2 text-lg" /> Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
      
      <main className="flex-1 overflow-y-auto px-4 bg-[#121212]">{children}</main>
      
      {isProfileModalOpen && user && (
        <div className="fixed top-16 right-4 z-20 transform transition-all duration-300">
          <ProfileCard user={user} onClose={closeProfileCard} />
        </div>
      )}
    </div>
  );
}

const NavLink = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.push(href)}
      className="flex items-center space-x-2 text-gray-100 hover:bg-transparent hover:text-blue-500 transition-all duration-200 px-4 py-2 rounded-lg"
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </Button>
  );
};
