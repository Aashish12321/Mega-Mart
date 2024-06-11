import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import {Link, Outlet} from 'react-router-dom'

const Admin = () => {
  const user = useSelector(state => state?.user?.user);

  return (
    <div className="hidden lg:flex min-h-[calc(100vh-128px)] xl:min-h-[calc(100vh-144px)]  text-white">
      <aside className="relative bg-gray-600 shadow-md text-white min-h-full max-w-64 w-full ">
          <div className='py-2  shadow-lg text-white'>
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
          <div className="grid mt-2 ">
            <Link to={'all-users'} className="w-auto mx-8 my-2 hover:text-red-500">All Users</Link>
            <Link to={'all-products'} className="mx-8 my-2 hover:text-red-500">All Products</Link>
          </div>
      </aside>
      <div className="w-full h-full bottom-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
