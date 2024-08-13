import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { RiCoupon2Fill, RiDashboardFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectUser } from "../../Store/selector";

const Admin = () => {
  const user = useSelector(selectUser);
  const [expandProduct, setExpandProduct] = useState(false);          


  return (
    <div className="md:flex h-full justify-between text-white">
      <aside className="hidden md:flex w-full md:max-w-52 lg:max-w-60 bg-zinc-800 border-r-2 border-stone-500 shadow-lg text-white flex-col ">
        <div className="w-full pt-6 pb-2 rounded-lg text-white">
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
        <div className="flex flex-col gap-2 w-full mt-3 p-2 border-t-2 border-stone-500">
          <Link
            to={"dashboard"}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <RiDashboardFill className="text-xl mt-0.5" />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"users"}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <IoPeople className="text-lg mt-1" /> 
            <p>Users</p>
          </Link>
          <Link
            to={"create-coupon"}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <RiCoupon2Fill  className="text-lg mt-1" />
            <p>Create Coupon</p>
          </Link>
          <Link
            to={"all-products"}
            onClick={(e) => setExpandProduct(!expandProduct)}
            className="cursor-pointer flex space-x-2 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full items-center"
          >
            {expandProduct ? (
              <MdKeyboardArrowRight className="text-2xl duration-300 rotate-90" />
            ) : (
              <MdKeyboardArrowRight className="text-2xl duration-300 rotate-0" />
            )}
            <p>Products</p>
          </Link>
          {expandProduct && (
            <div className="ml-12 flex flex-col gap-2">
              <Link to={"all-products"} className="px-2 py-1 hover:bg-stone-700 rounded-full">
                All Products
              </Link>
              <Link to={"add-product"} className="px-2 py-1 hover:bg-stone-700 rounded-full">
                Add Product
              </Link>
              <Link to={"add-category"} className="px-2 py-1 hover:bg-stone-700 rounded-full">
                Add Category
              </Link>
              <Link to={"add-banner"} className="px-2 py-1 hover:bg-stone-700 rounded-full">
                Add Banners
              </Link>
            </div>
          )}
        </div>
      </aside>

      <div className="md:hidden mx-1 my-2 p-1 text-center text-sm rounded-md h-8 bg-customCard">
        <Link className="mr-2 hover:text-red-500" to={'dashboard'}>Dashboard</Link>
        <Link className="mx-2 hover:text-red-500" to={'users'}>Users</Link>
        <Link className="ml-2 hover:text-red-500" to={'create-coupon'}>Create Coupon</Link>
        <Link className="mx-2 hover:text-red-500" to={'all-products'}>Products</Link>
        <Link className="ml-2 hover:text-red-500" to={'add-product'}>Add Product</Link>
        <Link className="ml-2 hover:text-red-500" to={'add-category'}>Add Category</Link>
        <Link className="ml-2 hover:text-red-500" to={'add-banner'}>Add Banners</Link>
      </div>

      <div className="w-full bg-stone-600 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
  