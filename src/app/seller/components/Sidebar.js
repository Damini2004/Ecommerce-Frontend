"use client";

import { useState } from "react";
import { ShoppingCart, Users, DollarSign, Package, LogOut, Settings, Box, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className={`bg-gray-800 shadow-lg ${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>Seller</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            ☰
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={ShoppingCart} label="Dashboard" open={sidebarOpen} onClick={() => router.push("/seller/dashboard")} />
          <SidebarItem icon={Box} label="Products" open={sidebarOpen} onClick={() => router.push("/seller/products")} />
          <SidebarItem icon={DollarSign} label="Analytics" open={sidebarOpen} onClick={() => router.push("/seller/analytics")} />
          <SidebarItem icon={Users} label="Customers" open={sidebarOpen} onClick={() => router.push("/seller/customers")} />
          <SidebarItem icon={ShieldCheck} label="KYC Updates" open={sidebarOpen} onClick={() => router.push("/seller/kyc")} />
          <SidebarItem icon={Settings} label="Settings" open={sidebarOpen} onClick={() => router.push("/seller/settings")} />
          <SidebarItem icon={LogOut} label="Logout" open={sidebarOpen} onClick={handleLogout} />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, open, onClick }) {
  return (
    <div
      className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <Icon size={20} className="text-gray-200" />
      {open && <span className="ml-3 text-gray-100 font-medium">{label}</span>}
    </div>
  );
}
