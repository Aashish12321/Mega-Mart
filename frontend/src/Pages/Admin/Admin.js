import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import {Link, Outlet} from 'react-router-dom'

const Admin = () => {
  const user = useSelector(state => state?.user?.user);
  const [expandProduct, setExpandProduct] = useState(false);
  return (
    <div className="hidden lg:flex min-h-[calc(100vh-128px)] xl:min-h-[calc(100vh-144px)]  text-white">
      <aside className="relative mx-2 my-3 shadow-lg rounded-lg text-white flex-col  max-w-64 w-full">
          <div className='w-full py-2 rounded-lg bg-customCard text-white'>
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
          <div className="absolute top-[145px] flex flex-col bottom-0 w-full mt-3 rounded-lg bg-customCard">
            <div className="flex space-x-3 mt-4 my-2 mx-8 hover:text-red-500 rounded-xl px-2">
              <RiDashboardFill className="text-xl mt-0.5"/>
              <Link to={'dashboard'}>Dashboard</Link>
            </div>
            <div className="flex space-x-3 my-2 mx-8 hover:text-red-500  rounded-xl px-2">
              <IoPeople className="text-lg mt-1"/>
              <Link to={'users'}>Users</Link>
            </div>
            <div className="flex space-x-1 my-2 mx-8 hover:text-red-500  rounded-xl px-1 items-center">
              {
                expandProduct?
                <MdOutlineKeyboardArrowDown className="text-3xl"/>
                :
                <MdKeyboardArrowRight className="text-3xl"/>
              }
              <Link to={'all-products'} onClick={(e)=>setExpandProduct(!expandProduct)}>Products</Link>
            </div>
            {
              expandProduct && 
              <div className="ml-20 flex flex-col">
                  <Link to={'all-products'} className="hover:text-red-500">All Products</Link>
                  <Link to={'add-product'} className="my-2 hover:text-red-500">Add Product</Link>
              </div>
            }
          </div>
      </aside>
      <div className="w-full min-h-full bg-customCard ml-1 mr-2 my-3 shadow-lg rounded-lg bottom-4">
        <Outlet  />
      </div>
    </div>
  );
};

export default Admin;
