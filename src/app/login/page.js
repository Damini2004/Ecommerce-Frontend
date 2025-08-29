"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Sparkles, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import apiService from "@/utils/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading and check existing auth
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user?.role) {
        redirectToRole(user.role);
      } else {
        setPageLoading(false);
      }
    }, 1000);
  }, []);

  const redirectToRole = (role) => {
    const routes = {
      superadmin: "/superadmin-dashboard",
      admin: "/admin/dashboard", 
      seller: "/seller/dashboard",
      user: "/user/dashboard"
    };
    router.push(routes[role] || "/dashboard");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Clear message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await apiService.login(formData);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setMessage("✨ Welcome back! Redirecting...");
      setTimeout(() => redirectToRole(res.data.user.role), 1500);
    } catch (err) {
      setMessage(err.message || "❌ Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner fullScreen text="Loading your experience..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EcommerceHub
            </span>
          </div>
          <Button
            variant="secondary"
            onClick={() => router.push("/seller/register")}
            className="hidden sm:flex"
          >
            🚀 Become a Seller
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Welcome Card */}
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                required
              />

              <Input
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                showPasswordToggle
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full group"
              >
                {!loading && (
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                )}
                Sign In
              </Button>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-lg text-center text-sm font-medium ${
                  message.includes("✨") 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {message}
                </div>
              )}

              {/* Additional Links */}
              <div className="text-center space-y-4">
                <Link 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
                >
                  Forgot your password?
                </Link>
                
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm">
                    New to our platform?{" "}
                    <Link 
                      href="/register" 
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                    >
                      Create your account
                    </Link>
                  </p>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-xs font-medium text-gray-700 mb-2">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-medium text-gray-600">Admin:</p>
                    <p className="text-gray-500">admin@test.com / admin123</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Seller:</p>
                    <p className="text-gray-500">seller@test.com / seller123</p>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}