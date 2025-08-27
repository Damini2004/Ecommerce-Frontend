"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function SellerDashboard() {
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar (now reusable) */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, Seller!</h1>
        {/* Dashboard content goes here */}
      </main>
    </div>
  );
}
