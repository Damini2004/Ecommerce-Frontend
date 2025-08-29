"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Loader2, ShieldCheck } from "lucide-react";

export default function KYCManagementPage() {
  const [pendingKYC, setPendingKYC] = useState([]);
  const [verifiedKYC, setVerifiedKYC] = useState([]);
  const [allSellers, setAllSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("pending");

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      throw new Error("No token found");
    }
    return token;
  };

  const fetchPendingKYC = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      const res = await api.get("/gnet/kyc/pendingkyc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data?.kycs || [];
      setPendingKYC(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pending KYC data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVerifiedKYC = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      const res = await api.get("/gnet/kyc/verifiedkyc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data?.kycs || [];
      setVerifiedKYC(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch verified KYC data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSellers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      const res = await api.get("/gnet/auth/sellerlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Normalize the seller list to always be an array of objects with _id, firstname, lastname, email
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.sellers
        ? res.data.sellers
        : [];
        console.log(res.data);
      setAllSellers();
    } catch (err) {
      console.error(err);
      setError("Failed to fetch all sellers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "pending") fetchPendingKYC();
    if (activeTab === "verified") fetchVerifiedKYC();
    if (activeTab === "all") fetchAllSellers();
  }, [activeTab]);

  const renderTable = (data, type) => (
    <div className="overflow-x-auto rounded-lg shadow-lg mt-4">
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
        <thead className="bg-gray-700 text-gray-200">
          <tr>
            <th className="p-3 text-left">Seller ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            {type !== "all" && <th className="p-3 text-left">Status</th>}
            {type === "pending" && <th className="p-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={type === "pending" ? 5 : 4} className="p-3 text-gray-400">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((seller) => (
              <tr
                key={seller._id}
                className="hover:bg-gray-700 border-b border-gray-600"
              >
                <td className="p-3">{seller._id}</td>
                <td className="p-3">{seller.user.firstname} {seller.user.lastname}</td>
                <td className="p-3">{seller.user.email}</td>
                {type !== "all" && (
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        type === "pending" ? "bg-yellow-500 text-black" : "bg-green-500 text-black"
                      }`}
                    >
                      {type === "pending" ? "Pending" : "Verified"}
                    </span>
                  </td>
                )}
                {type === "pending" && (
                  <td className="p-3 flex gap-2">
                    <button className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm">
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ShieldCheck size={28} className="text-green-400" />
        KYC Management
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-green-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending KYC
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "verified" ? "bg-green-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("verified")}
        >
          Verified KYC
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "all" ? "bg-green-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("all")}
        >
          All Sellers
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="animate-spin h-8 w-8 text-green-400" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {activeTab === "pending" && renderTable(pendingKYC, "pending")}
          {activeTab === "verified" && renderTable(verifiedKYC, "verified")}
          {activeTab === "all" && renderTable(allSellers, "all")}
        </>
      )}
    </div>
  );
}
