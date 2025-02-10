// signin.tsx
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/auth/auth-card";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertMessage } from "@/components/AlertMessage";
import { BACKEND_URL } from "@/app/config";
import Link from "next/link";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [alertmessage, setAlertMessage] = useState<{ message: string, status: "success" | "failure" } | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, credentials);
      if (response.status === 200) {
        setAlertMessage({ message: response.data.message, status: "success" });
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } catch (error: any) {
      const errorMessage = "Failed to log in, check your credentials";
      setAlertMessage({ message: errorMessage, status: "failure" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div> 
    
      <AuthCard
        title="Welcome back"
        description="Sign in to your TaskForge account"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-transparent border border-white text-white backdrop-blur-sm transition-colors focus:bg-transparent"
                required
                onChange={(e: any) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-transparent border border-white text-white backdrop-blur-sm transition-colors focus:bg-transparent"
                required
                onChange={(e: any) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="border border-white" />
            <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
              Remember me
            </label>
          </div>

          <Button
            className="w-full bg-blue-800 hover:bg-blue-600 transition-all duration-300"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-white">
            <span className="text-gray-400">Don't have an account?</span>{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>

        {alertmessage && (
          <AlertMessage message={alertmessage.message} status={alertmessage.status} />
        )}
      </AuthCard> 
      </div>
  );
}
