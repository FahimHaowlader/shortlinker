import React from 'react'

const LoadingSpiner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpiner
