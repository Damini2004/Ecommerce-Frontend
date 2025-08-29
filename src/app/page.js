"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Shield, Users, Package, TrendingUp, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user?.role) {
        const routes = {
          superadmin: "/superadmin-dashboard",
          admin: "/admin/dashboard", 
          seller: "/seller/dashboard",
          user: "/user/dashboard"
        };
        router.push(routes[user.role] || "/dashboard");
      } else {
        setLoading(false);
      }
    }, 1000);
  }, [router]);

  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with end-to-end encryption",
      color: "blue"
    },
    {
      icon: Users,
      title: "Multi-Role System",
      description: "Separate dashboards for admins, sellers, and customers",
      color: "purple"
    },
    {
      icon: Package,
      title: "Product Management",
      description: "Advanced inventory and product management tools",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description: "Real-time analytics and comprehensive reporting",
      color: "orange"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Store Owner",
      content: "This platform transformed my business. The seller dashboard is intuitive and powerful!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=60&h=60&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "E-commerce Admin",
      content: "Best admin panel I've ever used. The KYC management features are exceptional.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", 
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Customer",
      content: "Shopping here is a breeze. Fast, secure, and user-friendly interface.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 5
    }
  ];

  if (loading) {
    return <LoadingSpinner fullScreen text="Welcome to EcommerceHub..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EcommerceHub
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <Badge variant="primary" className="mb-4">
              ✨ Now Available
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Future of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              E-commerce Platforms
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Powerful, secure, and intuitive e-commerce platform designed for modern businesses. 
            Multi-role dashboards, advanced analytics, and seamless user experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link href="/register">
              <Button variant="primary" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/seller/register">
              <Button variant="secondary" size="lg">
                🚀 Become a Seller
              </Button>
            </Link>
          </div>

          {/* Demo Credentials */}
          <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/90 border-0">
            <h3 className="font-semibold text-gray-900 mb-4">Try Demo Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-blue-600 mb-1">Admin Access</p>
                <p className="text-gray-600">admin@test.com</p>
                <p className="text-gray-500">admin123</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-purple-600 mb-1">Seller Access</p>
                <p className="text-gray-600">seller@test.com</p>
                <p className="text-gray-500">seller123</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-green-600 mb-1">Super Admin</p>
                <p className="text-gray-600">superadmin@test.com</p>
                <p className="text-gray-500">superadmin123</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Built with cutting-edge technology for the modern e-commerce experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center group">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${
                    feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    feature.color === 'green' ? 'from-green-500 to-green-600' :
                    'from-orange-500 to-orange-600'
                  } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful businesses already using our platform
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register">
              <Button variant="secondary" size="lg" className="group">
                Get Started Free
                <CheckCircle className="ml-2 group-hover:scale-110 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold">EcommerceHub</span>
          </div>
          <p className="text-sm">
            © 2024 EcommerceHub. Built with ❤️ for the future of e-commerce.
          </p>
        </div>
      </footer>
    </div>
  );
}