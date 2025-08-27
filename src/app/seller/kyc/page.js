"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Sidebar Component
function Sidebar({ onNavigate }) {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
    { name: "KYC Management", path: "/admin/kyc" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-gray-200 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onNavigate(item.path)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-700"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// KYC Upload Form
function KYCUploadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    shopName: "",
    gst: "",
    shopAddress: "",
    msme: "",
    bankName: "",
    accountHolder: "",
    ifsc: "",
    branch: "",
    shopCategory: "",
    videoKyc: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://e-commerce-backend-zrus.onrender.com/gnet/kyc/submitkyc/68ad5fdbbb11c5d85067adf5",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("KYC submitted successfully!");
        setTimeout(() => router.push("/admin/kyc"), 2000);
      } else {
        setMessage(data.message || "Failed to submit KYC");
      }
    } catch (error) {
      setMessage("Error submitting KYC");
    }
  };

  return (
    <div className="flex-1 bg-gray-950 text-gray-200 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">KYC Upload</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-6 rounded-xl shadow-lg"
      >
        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit KYC
          </button>
        </div>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-green-400">{message}</p>
      )}
    </div>
  );
}

// Main Admin Layout
export default function AdminKYCPage() {
  const router = useRouter();

  return (
    <div className="flex">
      <Sidebar onNavigate={(path) => router.push(path)} />
      <KYCUploadForm />
    </div>
  );
}
