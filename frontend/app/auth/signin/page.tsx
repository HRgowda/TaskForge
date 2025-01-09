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

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [alertmessage, setAlertMessage] = useState<{message: string, status: "success" | "failure"}| null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/signin", credentials)
      if (response.status === 200){
        setAlertMessage({message: response.data.message, status: "success"})
        setTimeout(() => {
          router.push("/dashboard/home") 
        }, 3000)       
      }
    } catch (error) {
      const errorMessage = "Failed to log in, check your credentials"
      setAlertMessage({message: errorMessage, status: "failure"})
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Design */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center">
        <Design title="Log In to Continue" description="Access your account and get back to your tasks." />
      </div>
      
      {/* Right Section: AuthCard Wrapper */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-4/5"> {/* This makes the AuthCard 80% of the container width */}
          <AuthCard
            title="Welcome back"
            description="Sign in to your TaskForge account"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/50 backdrop-blur-sm transition-colors focus:bg-white"
                    required
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-primary/80 hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white/50 backdrop-blur-sm transition-colors focus:bg-white"
                    required
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                </div>
              </div>
  
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
  
              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
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
  
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </AuthCard>
          {alertmessage && (
            <AlertMessage message={alertmessage.message} status={alertmessage.status} />
          )}
        </div>
      </div>
    </div>
  );
  
}