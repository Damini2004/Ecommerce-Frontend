"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function CreateAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [step, setStep] = useState("form"); // form | otp | list
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const router = useRouter();

  // ✅ Helper: Get token or redirect to login
  const getToken = () => {

    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      alert("Session expired. Please log in again.");
      router.push("/"); // redirect to login/home
      throw new Error("No token found");
    }
    return token;
  };

  // ✅ Fetch admins list
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await api.get(
        "/gnet/auth/admins", // ensure this matches backend
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdmins(res.data || []);
      setFetchError(false);
    } catch (err) {
      console.warn("Admin listing API not available yet:", err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Create Admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await api.post("/gnet/auth/create-admin", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Admin created! Please check email for OTP.");
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Failed to create admin.");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await api.post("/gnet/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      alert("OTP verified! Admin registered.");
      setStep("list");
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Invalid OTP.");
    }
  };

  // ✅ Resend OTP
  const handleResendOtp = async () => {
    try {
      await api.post("/gnet/auth/resend-otp", { email: formData.email });
      alert("OTP resent!");
    } catch (err) {
      console.error(err);
      alert("Failed to resend OTP.");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Create Admin</h1>

      {step === "form" && (
        /* Admin creation form */
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {["firstname", "lastname", "email", "phone", "password", "confirmPassword"].map((name) => (
            <input
              key={name}
              name={name}
              type={name.includes("password") ? "password" : "text"}
              placeholder={name[0].toUpperCase() + name.slice(1)}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          ))}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Create Admin
          </button>
        </form>
      )}

      {step === "otp" && (
        /* OTP verification form */
        <div className="space-y-4 max-w-md">
          <input
            name="otp"
            type="text"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleVerifyOtp}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Verify OTP
            </button>
            <button
              onClick={handleResendOtp}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}

      {step === "list" && (
        /* Admin list, or fallback if API not available */
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Admins List</h2>

          {loading && <p>Loading...</p>}

          {!loading && fetchError && (
            <p className="text-gray-400">Admin list not available yet.</p>
          )}

          {!loading && !fetchError && (
            admins.length > 0 ? (
              <table className="w-full border border-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="p-2">{admin.firstname} {admin.lastname}</td>
                      <td className="p-2">{admin.email}</td>
                      <td className="p-2">{admin.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No admins found yet.</p>
            )
          )}

          <button
            onClick={() => setStep("form")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add New Admin
          </button>
        </div>
      )}
    </div>
  );
}
