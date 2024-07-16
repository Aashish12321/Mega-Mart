import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/selector";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

const CategoriesList = ({ categories, setShowCategorySidebar }) => {
  const user = useSelector(selectUser);
  const [catg, setCatg] = useState("");
  const [subCatgs, setSubCatgs] = useState("");
  const [prods, setProds] = useState("");

  return (
    <div>
      <div className="w-56 md:w-64 bg-gray-200 text-start ">
        <div className="flex p-[18px] bg-red-500 text-white justify-start gap-8 text-xl">
          {catg ? null : (
            <FaRegArrowAltCircleLeft
              onClick={() => setShowCategorySidebar(false)}
              className="text-md mt-1 cursor-pointer"
            />
          )}
          <div>Hello, {user ? `${user?.name.split(" ")[0]} :)` : "User !"}</div>
        </div>

        <div className="h-[100vh]">
          {categories.map((category, cindex) => (
            <div className="flex w-full max-w-56 md:max-w-64">
              <div
                key={cindex}
                onClick={() => setCatg(category.name)}
                className="flex w-full hover:bg-gray-300 hover:font-semibold p-3 justify-between cursor-pointer"
              >
                <div>{category.name}</div>
                <MdKeyboardArrowRight className="mt-1.5" />
              </div>
              {category.name === catg ? (
                <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] left-0 bg-gray-200 duration-500 ease-in-out">
                  <div className="flex bg-customCard text-white text-center text-md gap-4 p-3">
                    <FaRegArrowAltCircleLeft
                      onClick={() => setCatg("")}
                      className="text-red-500 hover:text-red-700 text-lg mt-1 cursor-pointer"
                    />
                    <div className="flex-wrap">More in {catg}</div>
                  </div>
                  {catg &&
                    category.subCategories.map((subCategory, sindex) => (
                      <div className="flex">
                        <div
                          key={sindex}
                          onClick={() => setSubCatgs(subCategory.name)}
                          className="flex w-full bg-gray-200 text-start hover:bg-gray-300 hover:font-semibold p-3 justify-between cursor-pointer"
                        >
                          <div>{subCategory.name}</div>
                          <MdKeyboardArrowRight className="mt-1.5" />
                        </div>

                        {subCategory.name === subCatgs ? (
                          <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] left-0 bg-gray-200 duration-500 ease-in-out">
                            <div className="flex bg-customCard text-white text-center text-md p-3">
                              <FaRegArrowAltCircleLeft
                                onClick={() => setSubCatgs("")}
                                className="text-red-500 hover:text-red-700 text-xl mt-1 cursor-pointer"
                              />
                              <div className="flex-wrap">
                                More in {subCatgs}
                              </div>
                            </div>
                            {subCatgs &&
                              subCategory.products.map((product, pindex) => (
                                <div className="flex">
                                  <div
                                    key={pindex}
                                    onClick={() => setProds(product.name)}
                                    className="flex w-full bg-gray-200 text-start hover:bg-gray-300 hover:font-semibold p-3 justify-between cursor-pointer"
                                  >
                                    <div>{product.name}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] -left-[350px] bg-gray-200 duration-300 ease-in-out"></div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] -left-[350px] bg-gray-200 duration-300 ease-in-out"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
