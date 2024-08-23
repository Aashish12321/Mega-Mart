import React, { useCallback, useContext, useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { MdArrowDropUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { setCategories } from "../Store/categorySlice";
import role from "../Common/role";
import CategoriesList from "./CategoriesList";
import { selectUser } from "../Store/selector";
import Context from "../Context";

const Header = () => {
  const [showuserMenu, setShowUserMenu] = useState(false);
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const context = useContext(Context);

  const allCategory = useCallback(async () => {
    let fetchCategory = await fetch(SummaryApi.get_categories.url, {
      method: SummaryApi.get_categories.method,
    });

    fetchCategory = await fetchCategory.json();
    if (fetchCategory.success) {
      dispatch(setCategories(fetchCategory.data));
    }
    if (fetchCategory.error) {
      toast.error(fetchCategory.message);
    }
  }, [dispatch]);

  useEffect(() => {
    allCategory();
  }, [allCategory]);

  return (
    <>
      <header className="w-full sticky top-0 z-20 select-none bg-gray-900">
        <div className="flex items-center py-1 justify-around">
          <div className="flex w-full min-[320px]:w-40 md:w-44 lg:w-48 2xl:w-56 text-white cursor-pointer items-center justify-around">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-full h-full" />
            </Link>
          </div>

          <div className="hidden sm:flex w-full sm:max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl bg-slate-100 items-center rounded-lg cursor-pointer">
            <input
              className="w-full bg-transparent outline-none h-9 pl-1 border-l-8 border-red-500 rounded-l-lg"
              type="text"
              placeholder="Search for product, brand and more..."
            />
            <div className="h-9 w-9 p-2.5 text-white rounded-r-lg bg-red-500">
              <GoSearch />
            </div>
          </div>

          <div
            onMouseEnter={() => setExpandSearch(true)}
            onMouseLeave={() => setExpandSearch(false)}
            className="flex sm:hidden h-9 w-9 p-1.5 rounded-r-lg text-white text-2xl cursor-pointer"
          >
            <GoSearch />
          </div>
          <div
            onMouseEnter={() => setExpandSearch(true)}
            onMouseLeave={() => setExpandSearch(false)}
            className={`flex sm:hidden w-full transition-transform duration-500 ${
              expandSearch ? "translate-y-0" : "-translate-y-16"
            } fixed justify-between z-10 md:max-w-xs lg:max-w-md 2xl:max-w-md bg-slate-100 items-center rounded-lg cursor-pointer `}
          >
            {expandSearch && (
              <>
                <input
                  className="w-full bg-transparent outline-none h-12 pl-1 border-l-8 border-red-500 rounded-l-lg"
                  type="text"
                  placeholder="Search for product, brand and more..."
                />
                <div
                  className={`w-12 p-3.5  rounded-r-lg text-xl text-white bg-red-500 cursor-pointer`}
                >
                  <GoSearch />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center h-12 gap-4 lg:gap-8 justify-end">
            <Link
              to={"/profile/cart"}
              className="relative text-3xl flex cursor-pointer text-white"
            >
              <span>
                <FaCartShopping />
              </span>
              <div className="absolute bg-red-500 w-5 flex justify-center rounded-2xl -top-2 -right-1.5">
                {user?._id && (
                  <span className="text-sm font-semibold text-white">
                    {context?.cartProductsCount}
                  </span>
                )}
              </div>
            </Link>

            <div className="flex justify-center text-white ">
              {!user?._id && (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-red-500 w-16 h-8 text-white rounded-full shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                >
                  Login
                </button>
              )}
              {user?._id && (
                <div
                  className="min-[375px]:mx-3 w-10 h-10 text-3xl cursor-pointer text-white items-center"
                  onClick={() => {
                    setShowUserMenu(!showuserMenu);
                  }}
                >
                  {user?.profilePic ? (
                    <img
                      className="w-full h-full rounded-full"
                      src={user?.profilePic}
                      alt={user?.username}
                    />
                  ) : (
                    <FaUserCircle className="w-full max-w-10 h-10" />
                  )}
                </div>
              )}
              {showuserMenu && (
                <div
                  className={`absolute mt-12 lg:mt-[51px] xl:mt-14 flex flex-col items-center w-28 border rounded-b-lg border-t-0 border-zinc-400 bg-stone-200 text-stone-700`}
                >
                  <MdArrowDropUp className="absolute text-4xl text-stone-200 -my-5 text-center" />
                  {user?.role === role.admin && (
                    <Link
                      to={"/admin/all-products"}
                      onClick={() => setShowUserMenu(!showuserMenu)}
                      className="w-full border-b border-zinc-400 min-[320px]:flex justify-center font-semibold p-1 hover:text-red-500"
                    >
                      Admin
                    </Link>
                  )}

                  <Link
                    to={"/profile/cart"}
                    className="flex items-center justify-center p-1 font-semibold hover:text-red-500"
                    onClick={() => {
                      setShowUserMenu(!showuserMenu);
                    }}
                  >
                    Profile
                  </Link>
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
      </header>

      {/* Categories sidemenu */}
      <div className="fixed top-0 left-0 z-20 text-black">
        {showCategorySidebar ? (
          <div className="fixed transition-transform translate-x-0 duration-500 ease-in-out">
            <CategoriesList
              showCategorySidebar={showCategorySidebar}
              setShowCategorySidebar={setShowCategorySidebar}
            />
          </div>
        ) : (
          <div className="fixed transition-transform -translate-x-64 duration-500 ease-in-out">
            <CategoriesList
              showCategorySidebar={showCategorySidebar}
              setShowCategorySidebar={setShowCategorySidebar}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
