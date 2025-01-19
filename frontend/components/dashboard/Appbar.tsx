"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { BACKEND_URL } from "@/app/config";

export function AppBar() {
  const router = useRouter();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Fetch logged-in user data on profile modal open
  useEffect(() => {
    const fetchUserData = async () => {
      if (isProfileModalOpen) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/logged_user`, {
            headers: {
              "Authorization": `${localStorage.getItem("token")}`,
            },
          });

          // Set the user data
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isProfileModalOpen]); // Trigger fetch when modal opens

  // Close profile card function
  const closeProfileCard = () => setProfileModalOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-10 border-b bg-white",
        "h-16 flex items-center shadow-sm"
      )}
    >
      <div className="w-full flex justify-between items-center px-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <span className="text-xl font-bold">TaskForge</span>
        </div>

        {/* Button Section */}
        <div className="space-x-4">
          <Button
            variant="ghost"
            onClick={() => setProfileModalOpen((prev) => !prev)} // Toggle profile modal
          >
            Profile
          </Button>
          <Button variant="ghost">Settings</Button>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/auth/signin");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay Background */}
      {isProfileModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && user && (
        <div
          className="fixed top-16 right-4 z-20"
          onClick={() => setProfileModalOpen(false)} // Close on click outside
        >
          <ProfileCard user={user} onClose={closeProfileCard} />
        </div>
      )}
    </header>
  );
}
