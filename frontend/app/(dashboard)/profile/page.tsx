"use client"

import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface userProps {
  name: string;
  email: string;
  Solana: number;
  INR: number;
}

export default function Profile() {
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    async function userData() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${BACKEND_URL}/api/v1/user/logged_user`, {
          headers: {
            Authorization: token,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    userData();
  }, []);

  const getInitials = (name: string) => name[0].toUpperCase()

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full p-8 rounded-xl shadow-md hover:shadow-white hover:scale-105 transition-all duration-300 ease-in-out bg-[#1a1a1a]">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
            {user ? getInitials(user.name) : "?"}
          </div>
        </div>
        <div className="text-white">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Name */}
            <div>
              <h2 className="text-lg">Name:</h2>
            </div>
            <div>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-lg">Email:</h2>
            </div>
            <div>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>

            {/* Solana Balance */}
            <div>
              <h2 className="text-lg">Solana Balance:</h2>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-semibold">{user?.Solana} Sol's</p>
            </div>

            {/* INR Balance */}
            <div>
              <h2 className="text-lg">INR Balance:</h2>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-semibold">{user?.INR} rupees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
