"use client";

import Card from "@/components/ui/Card";

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon: Icon, 
  color = "blue",
  subtitle,
  loading = false
}) => {
  const colorVariants = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-600"
    },
    green: {
      bg: "from-green-500 to-emerald-600", 
      icon: "bg-green-100 text-green-600",
      text: "text-green-600"
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      icon: "bg-purple-100 text-purple-600", 
      text: "text-purple-600"
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      icon: "bg-orange-100 text-orange-600",
      text: "text-orange-600"
    },
    red: {
      bg: "from-red-500 to-red-600",
      icon: "bg-red-100 text-red-600",
      text: "text-red-600"
    }
  };

  const variant = colorVariants[color];

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover shadow="lg" className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${variant.bg} opacity-5 rounded-full transform translate-x-8 -translate-y-8`}></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {typeof value === 'number' && value > 1000 
              ? new Intl.NumberFormat('en-US', { 
                  notation: 'compact', 
                  maximumFractionDigits: 1 
                }).format(value)
              : value
            }
          </p>
          
          <div className="flex items-center space-x-2">
            {change && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                changeType === 'positive' 
                  ? 'bg-green-100 text-green-800' 
                  : changeType === 'negative'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {changeType === 'positive' && '+'}
                {change}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-gray-500">{subtitle}</span>
            )}
          </div>
        </div>
        
        {Icon && (
          <div className={`p-4 rounded-2xl ${variant.icon} shadow-sm`}>
            <Icon size={28} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;