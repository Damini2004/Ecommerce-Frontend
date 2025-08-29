"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import apiService from "@/utils/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: "Role Selection", description: "Choose your account type" },
    { number: 2, title: "Personal Info", description: "Tell us about yourself" }, 
    { number: 3, title: "Security", description: "Create your password" }
  ];

  const roles = [
    { 
      id: "user", 
      title: "Customer", 
      description: "Shop and buy products",
      icon: "🛍️",
      color: "blue"
    },
    { 
      id: "seller", 
      title: "Seller", 
      description: "Sell your products online",
      icon: "🚀", 
      color: "purple"
    },
    { 
      id: "superadmin", 
      title: "Super Admin", 
      description: "Full platform access",
      icon: "👑",
      color: "warning" 
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific field error
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 2) {
      if (!formData.firstname) newErrors.firstname = "First name is required";
      if (!formData.lastname) newErrors.lastname = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    
    if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setMessage("");
    setLoading(true);

    try {
      await apiService.register(formData);
      setMessage(`🎉 Registration successful! Welcome aboard as a ${formData.role}!`);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setMessage(err.message || "❌ Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
              <p className="text-gray-600">Select how you want to use our platform</p>
            </div>
            
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id })}
                  className={`w-full p-4 border-2 rounded-xl transition-all text-left hover:shadow-md ${
                    formData.role === role.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{role.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    {formData.role === role.id && (
                      <CheckCircle className="text-blue-500" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us a bit about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                icon={User}
                error={errors.firstname}
                required
              />
              <Input
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                icon={User}
                error={errors.lastname}
                required
              />
            </div>

            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
              error={errors.email}
              required
            />

            <Input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              error={errors.phone}
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Password</h2>
              <p className="text-gray-600">Choose a strong password for your account</p>
            </div>

            <Input
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              showPasswordToggle
              error={errors.password}
              required
            />

            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              showPasswordToggle
              error={errors.confirmPassword}
              required
            />

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Account Summary:</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><span className="font-medium">Role:</span> {roles.find(r => r.id === formData.role)?.title}</p>
                <p><span className="font-medium">Name:</span> {formData.firstname} {formData.lastname}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/login" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EcommerceHub
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {currentStep > step.number ? <CheckCircle size={16} /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step.number ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="success"
                    loading={loading}
                  >
                    Create Account
                  </Button>
                )}
              </div>

              {/* Message */}
              {message && (
                <div className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                  message.includes("🎉") 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {message}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="text-center mt-6 pt-6 border-t">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}