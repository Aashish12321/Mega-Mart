import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { MdArrowDropUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { setUserDetails } from "../Store/userSlice";
import role from "../Common/role";
import CategoriesList from "./CategoriesList";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showuserMenu, setShowUserMenu] = useState(false);
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      dispatch(setUserDetails(null));
      toast.success("Logout successful");
      console.log(token);
    } else {
      toast.info("You are not logged in.");
      navigate("/login");
    }
  };

  const allCategory = async () => {
    let fetchCategory = await fetch(SummaryApi.get_categories.url, {
      method: SummaryApi.get_categories.method,
    });

    fetchCategory = await fetchCategory.json();
    if (fetchCategory.success) {
      setCategories(fetchCategory.data.allCategory);
    }
    if (fetchCategory.error) {
      toast.error(fetchCategory.message);
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  return (
    <header className="shadow-md shadow-red-500 bg-gray-900 fixed top-0 w-full">
      <div className="flex items-center min-[320px]:py-2 2xl:py-0 justify-around ">
        <div className="flex min-[320px]:w-40 md:w-44 lg:w-48 2xl:w-56 text-white cursor-pointer items-center justify-around">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="hidden md:flex w-full md:max-w-xs lg:max-w-md 2xl:max-w-lg  items-center rounded-lg cursor-pointer">
          <input
            className="w-full  outline-none h-9 pl-1 border-l-8 border-red-500 rounded-l-lg"
            type="text"
            placeholder="Search product here..."
          />
          <div className="h-9 w-9 p-2.5 rounded-r-lg bg-red-500">
            <GoSearch />
          </div>
        </div>

        <div className="flex items-center h-12 gap-5 lg:gap-8 justify-end">
          <div className="relative text-3xl flex cursor-pointer text-white">
            <span>
              <FaCartShopping />
            </span>
            <div className="absolute bg-red-500 w-5 flex justify-center rounded-2xl -top-2 -right-1.5">
              <p className="text-sm text-white">88</p>
            </div>
          </div>

          <div className="relative flex justify-center">
            {!user?.email && (
              <button onClick={()=> navigate('/login')} className="bg-red-500 w-24 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all">
                Login
              </button>
            )}
            {user?.email && (
              <div
                className="text-3xl cursor-pointer text-white items-center"
                onClick={() => {
                  setShowUserMenu(!showuserMenu);
                }}
              >
                {user?.profilePic ? (
                  <img
                    className="w-10 rounded-full"
                    src={user?.profilePic}
                    alt={user?.username}
                  />
                ) : (
                  <FaUserCircle className="h-10" />
                )}
              </div>
            )}
            {showuserMenu && (
              <div className="absolute rounded-b-lg border-l-2 border-b-2 border-r-2 border-gray-900 top-[52px]  py-2 bg-white text-white">
                <MdArrowDropUp className="text-4xl -mt-[29px] ml-11" />

                {user?.role === role.admin && (
                  <div className="border-b-2 border-black -mt-4 ">
                    <Link
                      to={"/admin/all-products"}
                      onClick={() => setShowUserMenu(!showuserMenu)}
                      className="min-[320px]:flex mx-6 font-semibold whitespace-nowrap p-1 hover:text-red-500 text-black"
                    >
                      Admin
                    </Link>
                  </div>
                )}

                {user?.email && (
                  <Link
                    to={"/login"}
                    className="flex items-center mx-6 font-semibold text-black hover:text-red-500"
                    onClick={() => {
                      setShowUserMenu(!showuserMenu);
                      handleLogout();
                    }}
                  >
                    Logout
                    <IoLogOutOutline className="ml-1 text-xl" />
                  </Link>
                )}
              </div>
            )}
          </div>

          <div
            onClick={() => setShowCategorySidebar(!showCategorySidebar)}
            className="text-3xl text-white cursor-pointer"
          >
            {showCategorySidebar ? <RxCross2 /> : <HiMiniBars3 />}
          </div>
        </div>
      </div>

      {/* Categories sidemenu */}
      <div className="fixed text-black">
        {showCategorySidebar ? (
          <div
            onMouseLeave={() => setShowCategorySidebar(!showCategorySidebar)}
            className="fixed top-0 left-0 duration-700 ease-in-out "
          >
            <CategoriesList categories={categories} />
          </div>
        ) : (
          <div className="fixed top-0 -left-[250px] duration-500 ease-in-out">
            <CategoriesList categories={categories} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
