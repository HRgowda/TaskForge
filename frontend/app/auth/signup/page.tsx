"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/auth/auth-card";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios"
import { useRouter } from "next/navigation";
import { AlertMessage } from "@/components/AlertMessage";
import { BACKEND_URL } from "@/app/config";

export default function SignUpPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: "",
  })
  const [alertmessage, setAlertmessage] = useState<{message: string, status: "success" | "failure"} | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      setIsLoading(false);
  
      if (response.status === 200) {
        setAlertmessage({ message: response.data.message, status: "success" });
        router.push("/auth/signin");
      }
    } catch (error: any) {  
      if (error.response) {
        setAlertmessage({
          message: error.response.data.message || "Something went wrong!",
          status: "failure"
        });
      } else {
        setAlertmessage({ message: "Network error, please try again!", status: "failure" });
      }
      
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen">
  
      <div className="w-full flex items-center justify-center">
        <AuthCard
          title="Create your account"
          description="Start your 30-day free trial. No credit card required."
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="gap-4">
                <Label htmlFor="firstName">Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-transparent border border-white text-white backdrop-blur-sm transition-colors"
                  required
                  onChange={(e: any) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Work username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="john@company.com"
                  className="bg-transparent text-white backdrop-blur-sm transition-colors focus:bg-transparent border border-white"
                  required
                  onChange={(e: any) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="abc123!@#"
                  className="bg-transparent text-white backdrop-blur-sm transition-colors focus:bg-transparent"
                  required
                  onChange={(e: any) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <p className="text-xs text-gray-300 mt-4">
                  Must be at least 6 characters long
                </p>
              </div>
            </div>
  
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border border-white" required />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-white hover:text-white/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-white hover:text-white/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
  
            <Button
              className="w-full bg-blue-800 hover:bg-blue-600 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
  
            <div className="text-center text-sm">
              <span className="text-gray-400">Already have an account?</span>{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-blue-500 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </AuthCard>
        {alertmessage && (
          <AlertMessage
            message={alertmessage.message}
            status={alertmessage.status}
          />
        )}
      </div>
    </div>
  );
  
}