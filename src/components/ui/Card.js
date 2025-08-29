"use client";

const Card = ({ 
  children, 
  className = "", 
  hover = true, 
  shadow = "md", 
  padding = "md",
  ...props 
}) => {
  const baseClasses = "bg-white border border-gray-200 transition-all duration-200";
  
  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl"
  };
  
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  };
  
  const hoverClasses = hover ? `hover:${shadows.lg} hover:-translate-y-1` : "";
  
  return (
    <div 
      className={`${baseClasses} ${shadows[shadow]} ${paddings[padding]} ${hoverClasses} rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;