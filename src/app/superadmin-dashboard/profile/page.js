"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [customId, setCustomId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedCustomId = localStorage.getItem("customId");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedRole) setRole(storedRole);
    if (storedCustomId) setCustomId(storedCustomId);
  }, []);

  if (!user) {
    return <p className="text-center mt-10">No user data found. Please login again.</p>;
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-gray-900 shadow p-6 rounded-lg w-full md:w-2/3">
        {/* Custom ID */}
        <div className="mb-4">
          <p className="text-gray-400">Custom ID</p>
          <p className="font-semibold">{customId || user.customId}</p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <p className="text-gray-400">Name</p>
          <p className="font-semibold">{user.firstname} {user.lastname}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="text-gray-400">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <p className="text-gray-400">Phone</p>
          <p className="font-semibold">{user.phone}</p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <p className="text-gray-400">Role</p>
          <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            {role || user.role}
          </span>
        </div>

        {/* Account Status */}
        <div className="mb-4">
          <p className="text-gray-400">Account Status</p>
          <span
            className={`px-3 py-1 rounded text-sm ${
              user.isVerified ? "bg-blue-600" : "bg-red-600"
            }`}
          >
            {user.isVerified ? "Verified ✅" : "Not Verified ❌"}
          </span>
        </div>

        {/* Created At */}
        <div>
          <p className="text-gray-400">Created At</p>
          <p className="font-semibold">{new Date(user.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
