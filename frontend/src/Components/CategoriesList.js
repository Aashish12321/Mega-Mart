import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories, selectUser } from "../Store/selector";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CategoriesList = ({ showCategorySidebar, setShowCategorySidebar }) => {
  const user = useSelector(selectUser);
  const categories = useSelector(selectCategories);
  const [catg, setCatg] = useState("");
  const [subCatgs, setSubCatgs] = useState("");
  const navigate = useNavigate();

  const handleSearch = (category, subCategory, product) => {
    navigate(`/${category}/${subCategory}/${product}`);
    setShowCategorySidebar(false);
  };

  useEffect(() => {
    !showCategorySidebar && setCatg("");
    setSubCatgs("");
  }, [showCategorySidebar]);

  return (
    <div className="w-56 md:w-64 bg-stone-700 text-white text-start">
      <div className="flex items-center p-[18px] bg-zinc-800 justify-start gap-2 text-xl">
        {!catg && (
          <IoChevronBackCircleOutline
            onClick={() => setShowCategorySidebar(false)}
            className="text-2xl mt-0.5 cursor-pointer"
          />
        )}
        <div>Hello, {user ? `${user?.name.split(" ")[0]} :)` : "User !"}</div>
      </div>

      <div className="h-[100vh]">
        {categories.map((category, cindex) => (
          <div key={cindex} className="flex w-full max-w-56 md:max-w-64">
            <div
              onClick={() => setCatg(category.name)}
              className="flex w-full hover:bg-stone-600 hover:font-semibold p-3 justify-between cursor-pointer"
            >
              <div>{category.name}</div>
              <MdKeyboardArrowRight className="mt-1.5" />
            </div>
            {category.name === catg ? (
              <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-16 left-0 bg-stone-700 duration-500 ease-in-out">
                <div className="flex bg-stone-500 text-md gap-2 p-3">
                  <IoChevronBackCircleOutline
                    onClick={() => setCatg("")}
                    className="w-6 text-xl mt-0.5 cursor-pointer"
                  />
                  <div className="line-clamp-1">More in {catg}</div>
                </div>
                {catg &&
                  category.subCategories.map((subCategory, sindex) => (
                    <div className="flex">
                      <div
                        key={sindex}
                        onClick={() => setSubCatgs(subCategory.name)}
                        className="flex w-full bg-stone-700 text-start hover:bg-stone-600 hover:font-semibold p-3 justify-between cursor-pointer"
                      >
                        <div>{subCategory.name}</div>
                        <MdKeyboardArrowRight className="mt-1.5" />
                      </div>

                      {subCategory.name === subCatgs ? (
                        <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-16 left-0 bg-stone-700 duration-500 ease-in-out">
                          <div className="flex bg-stone-500 text-md gap-2 p-3">
                            <IoChevronBackCircleOutline
                              onClick={() => setSubCatgs("")}
                              className="w-6 text-xl mt-0.5 cursor-pointer"
                            />
                            <div className="line-clamp-1">
                              More in {subCatgs}
                            </div>
                          </div>
                          {subCatgs &&
                            subCategory.products.map((product, pindex) => (
                              <div className="flex">
                                <div
                                  key={pindex}
                                  onClick={() =>
                                    handleSearch(
                                      category?.name,
                                      subCategory?.name,
                                      product?.name
                                    )
                                  }
                                  className="flex w-full bg-stone-700 text-start hover:bg-stone-600 hover:font-semibold p-3 justify-between cursor-pointer"
                                >
                                  <div>{product.name}</div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] -left-[350px] bg-stone-700 duration-500 ease-in-out"></div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="w-full max-w-56 md:max-w-64 h-[100vh] fixed top-[64px] -left-[350px] bg-stone-700 duration-500 ease-in-out"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
