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
import { Design } from "@/components/auth/Design";
import { BACKEND_URL } from "@/app/config";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: ""
  })
  const [alertmessage, setAlertmessage] = useState<{message: string, status: "success" | "failure"} | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, credentials, {
  headers: {
    "Content-Type": "application/json"
  }
      });

      if(response.status == 200) {
        setAlertmessage({message: response.data.message, status: "success"})
        router.push("/auth/signin")
        setIsLoading(false)
      }
    } catch(error) {
      console.log(error)
      const errorMessage = "Failed to create your account, Please try again later"
      setAlertmessage({message: errorMessage, status: "failure"})
      setIsLoading(false)
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center">
        <Design title="Welcome to Your Journey" description="Start your journey by creating an account." />
      </div>
  
      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
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
                  className="bg-white/50 backdrop-blur-sm transition-colors focus:bg-white"
                  required
                  onChange={(e) =>
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
                  className="bg-white/50 backdrop-blur-sm transition-colors focus:bg-white"
                  required
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-white/50 backdrop-blur-sm transition-colors focus:bg-white"
                  required
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>
  
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
  
            <Button
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
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
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-primary/80 hover:text-primary transition-colors"
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