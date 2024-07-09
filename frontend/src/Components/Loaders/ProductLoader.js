import React from 'react'

const ProductLoader = () => {
  return (
    <div className="justify-center flex flex-wrap gap-4 min-[375px]:gap-6">
      {Array.from({ length: 18 }).map((element, index) => (
        <div key={index} className="w-36 min-[375px]:w-40 md:w-36 lg:w-40 xl:w-44 h-60 bg-gray-200 animate-pulse rounded-lg">
          <div className="w-full h-36 min-[375px]:h-40 md:h-36 lg:h-40 xl:h-44 bg-gray-300 rounded-t-lg"></div>
          <div className="p-2">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductLoader;
