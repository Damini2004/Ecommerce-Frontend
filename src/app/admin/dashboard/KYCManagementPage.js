"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api"; // your axios instance
import Sidebar from "@/components/Sidebar"; // adjust path if needed
import { Check, X } from "lucide-react";

export default function KYCManagementPage() {
  const [pendingKYC, setPendingKYC] = useState([]);
  const [verifiedKYC, setVerifiedKYC] = useState([]);
  const [allSellers, setAllSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPendingKYC();
    fetchVerifiedKYC();
    fetchAllSellers();
  }, []);

  const fetchPendingKYC = async () => {
    try {
      const res = await api.get("/gnet/kyc/pendingkyc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingKYC(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVerifiedKYC = async () => {
    try {
      const res = await api.get("/gnet/kyc/verifiedkyc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVerifiedKYC(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllSellers = async () => {
    try {
      const res = await api.get("/gnet/auth/sellerlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllSellers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyKYC = async (sellerId) => {
    setLoading(true);
    try {
      await api.post(`/gnet/kyc/verifykyc/${sellerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingKYC();
      fetchVerifiedKYC();
      alert("KYC verified successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to verify KYC.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Seller KYC Management</h1>

        {/* Pending KYC */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Pending KYC</h2>
          <div className="bg-white shadow rounded-lg p-4">
            {pendingKYC.length === 0 ? (
              <p>No pending KYC requests</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Seller ID</th>
                    <th className="border-b p-2">Name</th>
                    <th className="border-b p-2">Email</th>
                    <th className="border-b p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingKYC.map((seller) => (
                    <tr key={seller._id} className="hover:bg-gray-100">
                      <td className="p-2">{seller._id}</td>
                      <td className="p-2">{seller.firstname} {seller.lastname}</td>
                      <td className="p-2">{seller.email}</td>
                      <td className="p-2">
                        <button
                          disabled={loading}
                          onClick={() => verifyKYC(seller._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
                        >
                          <Check size={16} /> Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Verified KYC */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Verified KYC Sellers</h2>
          <div className="bg-white shadow rounded-lg p-4">
            {verifiedKYC.length === 0 ? (
              <p>No verified KYC sellers</p>
            ) : (
              <ul className="space-y-2">
                {verifiedKYC.map((seller) => (
                  <li key={seller._id} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                    <span>{seller.firstname} {seller.lastname} ({seller.email})</span>
                    <Check className="text-green-500" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* All Sellers */}
        <section>
          <h2 className="text-xl font-semibold mb-3">All Sellers</h2>
          <div className="bg-white shadow rounded-lg p-4">
            {allSellers.length === 0 ? (
              <p>No sellers found</p>
            ) : (
              <ul className="space-y-2">
                {allSellers.map((seller) => (
                  <li key={seller._id} className="p-2 bg-gray-50 rounded">
                    {seller.firstname} {seller.lastname} ({seller.email})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
