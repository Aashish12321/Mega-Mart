import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import {Link, Outlet} from 'react-router-dom'

const Admin = () => {
  const user = useSelector(state => state?.user?.user);

  return (
    <div className="hidden lg:flex min-h-[calc(100vh-128px)] xl:min-h-[calc(100vh-144px)]  text-white">
      <aside className="relative mx-2 my-3 shadow-lg rounded-lg text-white flex-col  max-w-64 w-full">
          <div className='absolute w-full py-2 rounded-lg bg-gray-600 text-white'>
            {
              user?.profilePic?(<img className='w-20 h-20 mx-auto rounded-full' src={user?.profilePic} alt={user?.name} />):<FaUserCircle className='w-16 h-16 mx-auto rounded-full' />
            }
            <div className="text-center">
              {user?.name}
            </div>
            <div className="text-center">
              {user?.role}
            </div>
          </div>
          <div className="absolute top-[145px] flex flex-col bottom-0 w-full mt-3 rounded-lg bg-gray-600">
            <div className="flex space-x-3 mt-4 my-2 mx-8 hover:text-red-500 hover:bg-gray-700 rounded-xl px-2">
              <RiDashboardFill className="text-xl mt-0.5"/>
              <Link to={'dashboard'}>Dashboard</Link>
            </div>
            <div className="flex space-x-3 my-2 mx-8 hover:text-red-500 hover:bg-gray-700 rounded-xl px-2">
              <IoPeople className="text-lg mt-1"/>
              <Link to={'all-users'}>Users</Link>
            </div>
            <div className="flex space-x-1 my-2 mx-7 hover:text-red-500 hover:bg-gray-700 rounded-xl px-1">
              <RiArrowDropRightLine className="text-3xl"/>
              <Link to={'all-products'}>Products</Link>
            </div>
          </div>
      </aside>
      <div className="w-full min-h-full bg-gray-600 ml-1 mr-2 my-3 shadow-lg rounded-lg bottom-4">
        <Outlet  />
      </div>
    </div>
  );
};

export default Admin;
