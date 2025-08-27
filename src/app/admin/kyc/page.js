"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Loader2, ShieldCheck } from "lucide-react";

export default function KYCManagementPage() {
  const [pendingKYC, setPendingKYC] = useState([]); // Always default to an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch KYC Data
  const fetchPendingKYC = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/admin/kyc/pending");

      // Ensure response is an array
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.kyc || []; // fallback if API sends {kyc: [...]}

      setPendingKYC(data);
    } catch (err) {
      console.error("Error fetching KYC data:", err);
      setError("Failed to fetch KYC data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingKYC();
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ShieldCheck size={28} className="text-green-400" />
        KYC Management
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="animate-spin h-8 w-8 text-green-400" />
          <span className="ml-2">Loading pending KYC...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pendingKYC.length === 0 ? (
        <p className="text-gray-400">No pending KYC requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th className="p-3 text-left">Seller ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingKYC.map((seller) => (
                <tr
                  key={seller._id}
                  className="hover:bg-gray-700 border-b border-gray-600"
                >
                  <td className="p-3">{seller._id}</td>
                  <td className="p-3">
                    {seller.firstname} {seller.lastname}
                  </td>
                  <td className="p-3">{seller.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-yellow-500 text-black">
                      Pending
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
