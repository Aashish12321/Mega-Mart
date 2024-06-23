import React, { useState } from 'react'
import logo from '../Assets/logo.png'
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../Common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../Store/userSlice';
import role from '../Common/role';

// border-2 border-yellow-950

const Header = () => {
  const [showuserMenu, setShowUserMenu] = useState(0);

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  // console.log('user header', user);

  const handleLogout = async () => {
    let userData = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: 'include'
    })

    userData = await userData.json();
    if (userData.success){
      toast.success("Logged out successfully");
      dispatch(setUserDetails(null));
    }
    else{
      toast.error(userData.message);
    }
  }
  return (
    <header className='shadow-md shadow-red-500 bg-gray-900 fixed top-0 w-full'>
      <div className='container min-[320px]:h-16 lg:h-auto mx-auto px-3 flex  items-center justify-between'>
        <div className='cursor-pointer  min-[320px]:w-80 md:w-52 lg:w-auto 2xl:w-72'>
          <Link to={'/'} className=''><img  src={logo} alt="logo" /></Link>
        </div>

        <div className='hidden lg:flex shadow items-center w-full max-w-md justify-between rounded-lg cursor-pointer mx-28'>
          <input className='w-full outline-none h-9 pl-1 border-l-8 border-red-500 rounded-l-lg' type="text" placeholder='Search product here...'/>
          <div className='h-9 w-9 p-2.5 rounded-r-lg bg-red-500'>
            <GoSearch />
          </div>
        </div>

        <div className='flex w-full items-center h-12 max-w-md space-x-5 justify-end'>
          <div className='relative flex justify-center'>
            <div onClick={()=> setShowUserMenu(!showuserMenu)} className='text-3xl cursor-pointer text-white'>
              {
                user?._id?
                user?.profilePic? 
                (<img className='w-10  rounded-full' src={user?.profilePic} alt={user?.username} />)
                :<FaUserCircle />
                :null
              }
            </div>
            {
              showuserMenu?
                <div className='absolute rounded-b-md top-11 p-1  bg-gray-900  text-white'>
                  <span>
                  {
                    user?.role === role.admin && (
                      <Link to={'/admin/all-products'} onClick={()=> setShowUserMenu(0)} className='hidden md:flex whitespace-nowrap p-1 hover:text-red-500'>Admin</Link>
                    )
                  }
                  </span>
                </div>
                :
                null
            }

          </div>

          <div className='text-3xl  flex cursor-pointer relative text-white'>
            <span><FaCartShopping /></span>
            <div className='bg-red-500 w-5 h-5 flex justify-center rounded-2xl absolute -top-3 -right-2'>
              <p className='text-sm text-white'>88</p>
            </div>
          </div>

          <div>
          {
            user?.email ? 
            <Link to={'/login'} onClick={handleLogout} className='text-white text-4xl'><IoLogOutOutline /></Link> 
            : 
            <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-500 cursor-pointer'>Login</Link>
          }
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header;
