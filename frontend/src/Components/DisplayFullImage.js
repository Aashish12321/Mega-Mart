import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";

const DisplayFullImage = ({imgUrl, onClose}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-slate-300 bg-opacity-50 flex justify-between items-center">
        <div className="mx-auto rounded-md shadow-custom w-full max-w-lg">
          <button onClick={onClose} className="ml-auto block -mt-8">
            <FaRegWindowClose />
          </button>
          <img src={imgUrl} alt="photos" className='w-full pt-1 rounded-lg'/>
        </div>
    </div>
  )
}

export default DisplayFullImage;
