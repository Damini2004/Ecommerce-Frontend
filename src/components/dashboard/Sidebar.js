"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  FileText,
  Shield,
  UserCheck
} from "lucide-react";
import Link from "next/link";

const Sidebar = ({ userRole = "user", activePage = "dashboard" }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Role-based navigation items
  const navigationItems = {
    superadmin: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/superadmin-dashboard" },
      { id: "admins", label: "Manage Admins", icon: UserCheck, href: "/superadmin-dashboard/create-admin" },
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "/superadmin-dashboard/analytics" },
      { id: "profile", label: "Profile", icon: Users, href: "/superadmin-dashboard/profile" },
      { id: "settings", label: "Settings", icon: Settings, href: "/superadmin-dashboard/settings" },
    ],
    admin: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
      { id: "kyc", label: "KYC Management", icon: Shield, href: "/admin/kyc" },
      { id: "sellers", label: "Sellers", icon: Users, href: "/admin/sellers" },
      { id: "products", label: "Products", icon: Package, href: "/admin/products" },
      { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports" },
      { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
    ],
    seller: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/seller/dashboard" },
      { id: "products", label: "My Products", icon: Package, href: "/seller/products" },
      { id: "orders", label: "Orders", icon: ShoppingCart, href: "/seller/orders" },
      { id: "kyc", label: "KYC Status", icon: Shield, href: "/seller/kyc" },
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "/seller/analytics" },
      { id: "settings", label: "Settings", icon: Settings, href: "/seller/settings" },
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const navItems = navigationItems[userRole] || [];
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};

  return (
    <div className={`${
      isCollapsed ? "w-16" : "w-64"
    } transition-all duration-300 bg-white border-r border-gray-200 shadow-lg flex flex-col h-screen fixed left-0 top-0 z-30`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={16} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">EcommerceHub</h2>
                <p className="text-xs text-gray-500 capitalize">{userRole} Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.firstname?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className={`${isCollapsed ? "mx-auto" : "mr-3"} ${
                isActive ? "text-white" : ""
              }`} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} className={isCollapsed ? "" : "mr-3"} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;