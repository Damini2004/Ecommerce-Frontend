"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "@/utils/api";

export default function SellerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/gnet/auth/register-self",
        { ...formData, role: "seller" },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("✅ Registration successful! Enter OTP sent to your email.");
      setShowOtp(true);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  // OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) return setMessage("❌ Please enter OTP");
    setLoading(true);
    setMessage("");

    try {
      await api.post("/gnet/auth/verify-otp", { email: formData.email, otp });
      setMessage("✅ OTP verified! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "OTP verification failed"));
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await api.post("/gnet/auth/resend-otp", { email: formData.email });
      setMessage("✅ OTP resent to your email!");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Resend OTP failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-lg shadow-lg rounded-lg border border-gray-200 p-8">
        {!showOtp ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Create your Seller Account
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Join us and start selling your products today!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md p-3 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter the OTP sent to <strong>{formData.email}</strong>
            </p>

            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border text-black placeholder-black border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md p-3 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md p-3"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
