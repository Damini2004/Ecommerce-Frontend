"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 
import api from "@/utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.role) {
      redirectToRole(user.role);
    }
  }, []);

  const redirectToRole = (role) => {
    switch (role) {
      case "superadmin":
        router.push("/superadmin-dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "seller":
        router.push("/seller/dashboard");
        break;
      case "user":
        router.push("/user/dashboard");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/gnet/auth/login", formData);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Login successful!");
      redirectToRole(res.data.user.role);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
   {/* ✅ Navbar */}
<nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
  {/* Logo */}
  <div className="flex items-center gap-2">
    <img src="/logo.png" alt="Logo" className="h-9" />
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
 

    {/* Seller Button */}
    <button
      onClick={() => router.push("/seller/register")}
      className="px-4 py-2 rounded-md font-semibold text-yellow-600 border border-yellow-500 hover:bg-yellow-50 transition"
    >
      🚀 Become a Seller
    </button>
  </div>
</nav>


      {/* ✅ Login Card */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md border border-gray-300">
          {/* Logo inside card (optional, can remove since navbar has logo) */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 object-contain"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Sign in
            </h2>
            <p className="text-sm text-gray-700 text-center">
              Sign in to your account
            </p>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email or mobile number"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-black placeholder-black p-3 border border-gray-400 rounded-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-black placeholder-black p-3 border border-gray-400 rounded-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-900"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-semibold text-white transition ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? (
                <Loader2
                  className="animate-spin inline-block mr-2"
                  size={18}
                />
              ) : null}
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Message */}
            {message && (
              <p
                className={`text-sm text-center ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Additional Links */}
            <div className="text-center mt-2">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Forgot your password?
              </a>
            </div>
            <div className="text-center mt-4 border-t pt-4">
              <p className="text-sm text-gray-700">
                New to our platform?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Create your account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
