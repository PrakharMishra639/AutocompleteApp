import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center mt-4">
      <div className="w-10 h-10 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
