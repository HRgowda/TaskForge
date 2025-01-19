import React from "react";
import { Card } from "@/components/ui/card";  
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; 
import { Button } from "@/components/ui/button"; 

interface User {
  name: string;
  email: string;
}

export default function ProfileCard ({ user, onClose }: { user: User; onClose: () => void }) {
  const { name, email } = user;

  // Generate the first letter of the user's name
  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <Card className="relative w-96 max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Close Button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
      >
        &times;
      </Button>

      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32 border-4 border-blue-500">
          <AvatarFallback className="bg-blue-500 text-white text-5xl font-bold">
            {getInitial(name)}
          </AvatarFallback>
        </Avatar>

        {/* User Details */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800">{name || "Unknown User"}</h3>
          <p className="text-sm text-gray-500">{email || "No email provided"}</p>
        </div>
      </div>
    </Card>
  );
}; 