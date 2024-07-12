import React from 'react';

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center h-[70vh] items-center ">
      <div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      <div className='mt-2 animate-pulse text-white'>Loading...</div>
    </div>
  );
};

export default Spinner;
