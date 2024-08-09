import React, { useEffect, useRef } from 'react'
import { FaWindowClose } from 'react-icons/fa';

const DisplayFullImage = ({imgUrl, onClose}) => {
  const modalRef = useRef(null);

  useEffect(()=> {
    const handleKeyDown = (e) => {
      if(e.key === 'Escape'){
        onClose();
      }
    };

    const handleClickOutsideImage = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutsideImage);

  },[onClose, imgUrl]);

  return (
    <div className='fixed flex justify-center w-full left-0 top-[68px] right-0 bottom-0 bg-opacity-30 bg-slate-200'>
      <img ref={modalRef} src={imgUrl} alt="photos" className='h-auto object-contain bg-zinc-800'/>
      <button onClick={onClose} className='mb-auto -ml-6 text-2xl'>
        <FaWindowClose />
      </button>
    </div>
  )
}

export default DisplayFullImage;
