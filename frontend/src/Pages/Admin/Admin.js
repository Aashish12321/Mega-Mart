import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { RiCoupon2Fill, RiDashboardFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectUser } from "../../Store/selector";
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3 } from "react-icons/hi2";
import { BiSolidNotepad } from "react-icons/bi";

const Admin = () => {
  const user = useSelector(selectUser);
  const [expandProduct, setExpandProduct] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex relative justify-between text-white">
      <aside
        className={`fixed md:sticky flex flex-col transition-transform duration-500 ease-in-out md:transition-none ${
          showProfileMenu
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } min-h-screen w-full min-[320px]:max-w-60 md:max-w-52 lg:max-w-60 z-10 bg-zinc-800 border-r-2 border-stone-500 shadow-lg text-white`}
      >
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
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <RiDashboardFill className="text-xl mt-0.5" />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"users"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <IoPeople className="text-lg mt-1" />
            <p>Users</p>
          </Link>
          <Link
            to={"create-coupon"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <RiCoupon2Fill className="text-lg mt-1" />
            <p>Create Coupon</p>
          </Link>
          <Link
            to={"all-orders"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <BiSolidNotepad className="text-lg mt-1" />
            <p>All Orders</p>
          </Link>
          <div
            className={`${
              expandProduct
                ? "bg-stone-600 rounded-3xl"
                : "duration-500 ease-in-out rounded-3xl"
            }`}
          >
            <div
              onClick={(e) => setExpandProduct(!expandProduct)}
              className="cursor-pointer flex space-x-2 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full items-center"
            >
              {expandProduct ? (
                <MdKeyboardArrowRight className="text-2xl duration-300 rotate-90" />
              ) : (
                <MdKeyboardArrowRight className="text-2xl duration-300 rotate-0" />
              )}
              <p>Products</p>
            </div>

            <div
              className={`${
                expandProduct ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } ml-12 flex flex-col gap-2 duration-500 ease-in-out rounded-b-3xl`}
            >
              <Link
                to={"all-products"}
                onClick={() => setShowProfileMenu(false)}
                className="px-2 py-1 hover:bg-stone-700 rounded-full"
              >
                All Products
              </Link>
              <Link
                to={"add-product"}
                onClick={() => setShowProfileMenu(false)}
                className="px-2 py-1 hover:bg-stone-700 rounded-full"
              >
                Add Product
              </Link>
              <Link
                to={"add-category"}
                onClick={() => setShowProfileMenu(false)}
                className="px-2 py-1 hover:bg-stone-700 rounded-full"
              >
                Add Category
              </Link>
              <Link
                to={"add-banner"}
                onClick={() => setShowProfileMenu(false)}
                className="px-2 py-1 hover:bg-stone-700 rounded-full"
              >
                Add Banners
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="w-full bg-stone-600">
        <span className="md:hidden flex justify-end px-4 text-3xl text-white cursor-pointer">
          <span
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="mt-1 border-2 border-zinc-400 p-0.5"
          >
            {showProfileMenu ? <RxCross2 /> : <HiMiniBars3 />}
          </span>
        </span>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
