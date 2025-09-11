import React from 'react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div
          className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`}
        ></div>
        
        {/* Message */}
        <p className="text-gray-600 text-lg font-medium">{message}</p>
        
        {/* Alumni Platform branding */}
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Platform</h1>
          <p className="text-gray-500 mt-1">Connecting graduates worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
