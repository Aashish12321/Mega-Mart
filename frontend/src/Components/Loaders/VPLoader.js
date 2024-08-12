import React from "react";

// Vertical Product Loader
const VPLoader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-12 m-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="w-full bg-gray-200 animate-pulse rounded-lg">
          <div className="h-36 min-[375px]:h-44 md:h-48 lg:h-52 xl:h-56 bg-gray-300 rounded-t-lg"></div>
          <div className="p-2 h-36">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-2/5 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VPLoader;
