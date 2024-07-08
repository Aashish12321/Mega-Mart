import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  const [expandProduct, setExpandProduct] = useState(false);
  return (
    <div className="md:flex h-full justify-between text-white">
      <aside className="hidden md:flex w-full max-w-56 ml-3 my-3 shadow-lg rounded-lg bg-customCard text-white flex-col ">
        <div className="top-0 w-full py-2 rounded-lg  text-white">
          {user?.profilePic ? (
            <img
              className="w-20 h-20 mx-auto rounded-full"
              src={user?.profilePic}
              alt={user?.name}
            />
          ) : (
            <FaUserCircle className="w-16 h-16 mx-auto rounded-full" />
          )}
          <div className="text-center">{user?.name}</div>
          <div className="text-center">{user?.role}</div>
        </div>
        <div className="flex flex-col w-full mt-3 border-t-[12px] border-[#666]">
          <Link
            to={"dashboard"}
            className="cursor-pointer flex space-x-3 mt-4 my-2 mx-8 hover:text-red-500 rounded-xl px-2"
          >
            <RiDashboardFill className="text-xl mt-0.5" />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"users"}
            className="cursor-pointer flex space-x-3 my-2 mx-8 hover:text-red-500  rounded-xl px-2"
          >
            <IoPeople className="text-lg mt-1" />
            <p>Users</p>
          </Link>
          <Link
            to={"all-products"}
            onClick={(e) => setExpandProduct(!expandProduct)}
            className="cursor-pointer flex space-x-1 my-2 mx-8 hover:text-red-500  rounded-xl px-1 items-center"
          >
            {expandProduct ? (
              <MdOutlineKeyboardArrowDown className="text-3xl" />
            ) : (
              <MdKeyboardArrowRight className="text-3xl" />
            )}
            <p>Products</p>
          </Link>
          {expandProduct && (
            <div className="ml-20 flex flex-col">
              <Link to={"all-products"} className="hover:text-red-500">
                All products
              </Link>
              <Link to={"add-product"} className="my-2 hover:text-red-500">
                Add product
              </Link>
            </div>
          )}
        </div>
      </aside>

      <div className="md:hidden mx-1 my-2 p-1 text-center text-sm rounded-md h-8 bg-customCard">
        <Link className="mr-2 hover:text-red-500" to={'dashboard'}>Dashboard</Link>
        <Link className="mx-2 hover:text-red-500" to={'users'}>Users</Link>
        <Link className="mx-2 hover:text-red-500" to={'all-products'}>Products</Link>
        <Link className="ml-2 hover:text-red-500" to={'add-product'}>Add Product</Link>
      </div>

      <div className="w-full bg-customCard md:m-3 shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
  