import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="border-6 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Spinner;
