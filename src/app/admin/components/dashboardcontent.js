"use client";
import { Users, DollarSign, ShoppingCart, Activity } from "lucide-react";

const DashboardContent = () => {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users },
    { title: "Revenue", value: "$58,200", icon: DollarSign },
    { title: "Sales", value: "320", icon: ShoppingCart },
    { title: "Active Sessions", value: "85", icon: Activity },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold mt-4">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardContent;
