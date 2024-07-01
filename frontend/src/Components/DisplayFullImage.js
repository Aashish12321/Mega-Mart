import React, { useEffect, useRef, useState } from 'react'

const DisplayFullImage = ({imgUrl, onClose}) => {
  const [imagewidth, setImagewidth] = useState(0);
  const modalRef = useRef(null);

  useEffect(()=> {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImagewidth(img.width);
    }

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
    <div ref={modalRef} className='fixed flex justify-center h-[100vh] items-center top-0 left-80'>
      <img style={{width: imagewidth/1.45}}  src={imgUrl} alt="photos" className='bg-zinc-800 rounded-xl'/>
    </div>
  )
}

export default DisplayFullImage;
