import React, { useState } from "react";
import { FaCartArrowDown, FaHeart, FaUserCircle } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { BiSolidNotepad, BiSolidUserRectangle } from "react-icons/bi";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectUser } from "../../Store/selector";
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3 } from "react-icons/hi2";

const Profile = () => {
  const user = useSelector(selectUser);
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
            to={"account"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <BiSolidUserRectangle className="text-xl mt-0.5" />
            <p className="active:text-red-500">Account</p>
          </Link>
          <Link
            to={"favourites"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <FaHeart className="text-lg mt-1" />
            <p>Favourites</p>
          </Link>
          <Link
            to={"cart"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <FaCartArrowDown className="text-lg mt-1" />
            <p>Cart</p>
          </Link>
          <Link
            to={"Coupons"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <RiCoupon2Fill className="text-lg mt-1" />
            <p>Coupons & Promocode</p>
          </Link>
          <Link
            to={"orders"}
            onClick={() => setShowProfileMenu(false)}
            className="cursor-pointer flex space-x-3 px-3 py-1.5 hover:bg-stone-700 transition-colors rounded-full"
          >
            <BiSolidNotepad className="text-lg mt-1" />
            <p>Orders</p>
          </Link>
        </div>
      </aside>

      <div className="w-full bg-stone-600">
        <div className="md:hidden flex justify-end px-4 text-3xl text-white cursor-pointer">
          <span
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="mt-1 border-2 border-zinc-400 p-0.5"
          >
            {showProfileMenu ? <RxCross2 /> : <HiMiniBars3 />}
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
