// app/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  ShoppingCart,
  Package,
  LogOut,
} from "lucide-react"; // using lucide-react icons

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
<div className="w-64 h-screen bg-[#111827] text-white flex flex-col fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <img
          src="/logo.png" // replace with your logo path
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 mt-6 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <LayoutDashboard size={18} /> Overview
        </Link>
        <Link
          href="/dashboard/customers"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Users size={18} /> Customers
        </Link>
        <Link
          href="/dashboard/finance"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <DollarSign size={18} /> Finance
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Settings size={18} /> Setting
        </Link>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <ShoppingCart size={18} /> Orders
        </Link>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Package size={18} /> Products
        </Link>
      </nav>

      {/* Footer (Logout) */}
      <div className="mt-auto px-4 pb-6">
        {user && (
          <p className="text-xs mb-3 text-gray-400">
            Logged in as{" "}
            <span className="text-white font-semibold">{user.role}</span>
          </p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </div>
  );
}
