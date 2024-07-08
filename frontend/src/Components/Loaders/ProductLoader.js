import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-wrap justify-center w-36 min-[375px]:w-40 md:w-36 lg:w-40 xl:w-44">
      {Array.from({ length: 12 }).map((element, index) => (
        <div key={index} className="w-44 h-56 m-2 bg-gray-200 animate-pulse rounded-lg">
          <div className="w-full h-44 bg-gray-300 rounded-t-lg"></div>
          <div className="p-2">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading;
