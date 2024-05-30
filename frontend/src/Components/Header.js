import React from 'react'
import logo from '../Assets/logo.png'
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

// border-2 border-yellow-950

const Header = () => {
  return (
    <header className='shadow-md shadow-red-500 bg-gray-900 min-[320px]:p-2'>
      <div className='container  mx-auto flex items-center justify-between'>
        <div className='cursor-pointer mx-auto min-[320px]:w-80 md:w-52 lg:w-auto 2xl:w-72'>
          <Link to={'/'} className=''><img  src={logo} alt="logo" /></Link>
        </div>

        <div className='hidden lg:flex shadow  items-center w-full max-w-md justify-between rounded-lg cursor-pointer mx-auto ml-16'>
          <input className='w-full outline-none h-9 border-l-8 border-red-500 rounded-l-lg' type="text" placeholder=' Search product here...'/>
          <div className='h-9 w-9 p-2.5 rounded-r-lg bg-red-500'>
            <GoSearch />
          </div>
        </div>

        <div className='flex w-full max-w-md space-x-5 justify-end'>
          <div className='text-3xl cursor-pointer text-white'>
            <FaUserCircle />
          </div>

          <div className='text-3xl flex cursor-pointer relative text-white'>
            <span><FaCartShopping /></span>
            <div className='bg-red-500 w-5 h-5 flex justify-center rounded-2xl absolute -top-3 -right-2'>
              <p className='text-sm text-white'>88</p>
            </div>
          </div>

          <div>
            <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-500 cursor-pointer'>Login</Link>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header;
