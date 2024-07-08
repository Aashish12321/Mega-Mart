import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Spinner;
