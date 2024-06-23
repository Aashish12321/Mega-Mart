import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2 bottom-0 w-full">
      <div className="container mx-auto ">
        <div className='text-center text-sm mb-2'>
          Shop Quick, Shop Smart
        </div>

        <div className="text-center text-sm">
          {new Date().getFullYear()} Mega Mart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer;
