"use client";

import { useState } from "react";
import api from "@/utils/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user", // default role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dynamically choose API endpoint based on role
      const endpoint =
        formData.role === "superadmin"
          ? "/gnet/auth/register-superadmin"
          : formData.role === "seller"
          ? "/gnet/auth/register-seller"
          : "/gnet/auth/register-user";

      const res = await api.post(endpoint, formData);
      setMessage(`✅ Registration successful for ${formData.role}! You can now login.`);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-lg w-full max-w-md border border-gray-300"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create Your Account
        </h2>

        {/* Role Selector */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border placeholder-black text-black border-gray-400 rounded mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
          required
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="superadmin">Superadmin</option>
        </select>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded shadow transition"
        >
          Create Account
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer Links */}
        <p className="text-center text-gray-700 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
