import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface User {
  name: string;
  email: string;
}

export default function ProfileCard({ user, onClose }: { user: User; onClose: () => void }) {
  const { name, email } = user;

  // Generate the first letter of the user's name
  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <Card className="relative w-96 max-w-sm mx-auto p-2 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-xl rounded-xl border border-gray-200 fixed top-16 left-6 z-20 transform transition-all duration-300 ease-in-out hover:scale-105">
      {/* Close Button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900 transition-colors"
      >
        &times;
      </Button>

      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-6">
        <Avatar className="w-32 h-32 border-4 border-blue-500 bg-white shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
          <AvatarFallback className="bg-blue-500 text-white text-6xl font-semibold">
            {getInitial(name)}
          </AvatarFallback>
        </Avatar>

        {/* User Details */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-semibold text-gray-900">{name || "Unknown User"}</h3>
          <p className="text-lg text-gray-600">{email || "No email provided"}</p>
        </div>
      </div>

    </Card>
  );
}
