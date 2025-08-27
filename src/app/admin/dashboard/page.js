"use client";
import Sidebar from "../components/sidebar";
import DashboardContent from "../components/dashboardcontent";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <DashboardContent />
      </main>
    </div>
  );
}
