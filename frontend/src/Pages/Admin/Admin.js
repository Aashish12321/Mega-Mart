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
    <div className="hidden lg:flex w-full text-white">
      <div className="fixed max-w-64 w-full">
        <aside className="mx-2 my-3 shadow-lg rounded-lg text-white flex-col ">
            <div className='top-0 w-full py-2 rounded-lg bg-customCard text-white'>
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
            <div className="h-[410px] flex flex-col  w-full mt-3 rounded-lg bg-customCard">
              <Link to={'dashboard'} className="cursor-pointer flex space-x-3 mt-4 my-2 mx-8 hover:text-red-500 rounded-xl px-2">
                <RiDashboardFill className="text-xl mt-0.5"/>
                <p>Dashboard</p>
              </Link>
              <Link to={'users'} className="cursor-pointer flex space-x-3 my-2 mx-8 hover:text-red-500  rounded-xl px-2">
                <IoPeople className="text-lg mt-1"/>
                <p>Users</p>
              </Link>
              <Link onClick={(e)=>setExpandProduct(!expandProduct)} className="cursor-pointer flex space-x-1 my-2 mx-8 hover:text-red-500  rounded-xl px-1 items-center">
                {
                  expandProduct?
                  <MdOutlineKeyboardArrowDown className="text-3xl"/>
                  :
                  <MdKeyboardArrowRight className="text-3xl"/>
                }
                <p>Products</p>
              </Link>
              {
                expandProduct && 
                <div className="ml-20 flex flex-col">
                  <Link to={'all-products'} className="hover:text-red-500">All products</Link>
                  <Link to={'add-product'} className="my-2 hover:text-red-500">Add product</Link>
                </div>
              }
            </div>
        </aside>
      </div>
      <div className="ml-[260px] w-full bg-customCard mr-3 my-3 shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
