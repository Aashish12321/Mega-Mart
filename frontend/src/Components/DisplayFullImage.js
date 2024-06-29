import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";

const DisplayFullImage = ({imgUrl, onClose}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 bg-slate-300 bg-opacity-50 flex justify-between items-center">
        <div className="relative w-full mx-auto rounded-md shadow-custom max-w-lg overflow-auto">
          <button onClick={onClose} className="absolute ml-[495px]">
            <FaRegWindowClose className='rounded-tr-lg text-white bg-black'/>
          </button>
          <img src={imgUrl} alt="photos" className='w-full rounded-lg '/>
        </div>
    </div>
  )
}

export default DisplayFullImage;
