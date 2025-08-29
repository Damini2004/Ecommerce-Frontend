"use client";

import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ 
  size = "md", 
  className = "", 
  text = "",
  fullScreen = false 
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };
  
  const content = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Loader2 className="animate-spin text-blue-600" size={sizes[size]} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }
  
  return content;
};

export default LoadingSpinner;