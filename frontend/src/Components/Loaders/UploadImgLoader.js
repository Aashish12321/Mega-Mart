import React from "react";

const UploadImgLoader = ({length}) => {
  return (
    <div className={`flex flex-wrap gap-4`}>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg"
        >
          <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default UploadImgLoader;
