// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, ShoppingBag, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  if (!isAuth) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        You must login first!
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pl-64">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome + Search */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, <span className="text-indigo-600">Majed</span> 👋
          </h1>
          <input
            type="text"
            placeholder="Search amazon..."
            className="w-72 px-4 py-2 border rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">Total Revenue</h2>
                <p className="text-3xl font-bold text-green-600">$25,145.13</p>
                <p className="text-xs text-gray-400 mt-1">300+ Orders • +18%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-500" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">Total Customers</h2>
                <p className="text-3xl font-bold text-indigo-600">352,152</p>
                <p className="text-xs text-gray-400 mt-1">Last week • +18%</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Users className="text-indigo-500" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">Total Orders</h2>
                <p className="text-3xl font-bold text-orange-600">$25,145.12</p>
                <p className="text-xs text-gray-400 mt-1">Last week • +18%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <ShoppingBag className="text-orange-500" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Chart + Trending Products */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Status of Amazon Growth
            </h2>
            <div className="h-72 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
              [📈 Revenue vs Sales Chart]
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Trending Products
            </h2>
            <ul className="space-y-4 text-sm">
              {[
                ["💻", "Business Laptop HD", "$279"],
                ["🎧", "Headphone Jack Adapter", "$19"],
                ["🔊", "Wireless Headphones", "$34"],
                ["🥤", "Stanley Quencher", "$35"],
                ["⌚", "Crystal Accented Watch", "$17"],
              ].map(([icon, name, price], i) => (
                <li
                  key={i}
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-lg">
                      {icon}
                    </span>
                    {name}
                  </span>
                  <span className="font-semibold">{price}</span>
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-1 text-indigo-600 text-xs font-medium mt-4 hover:underline">
              See all <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Last Orders + Top Countries */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* Last Orders */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Last Orders
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Tracking</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["#5210", "Mahmoud Ali", "14/3/2024", "Complete", "$35.00"],
                  ["#5211", "Mahmoud Ali", "14/3/2024", "Pending", "$35.00"],
                ].map(([id, name, date, status, amount], i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2">{id}</td>
                    <td>{name}</td>
                    <td>{date}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status === "Complete"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Countries */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Top Countries
            </h2>
            <div className="h-56 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
              [🌍 Pie Chart]
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">
              598,734 Customers
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
