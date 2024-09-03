import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import VPLoader from "../Components/Loaders/VPLoader";
import VerticalProductCard from "../Components/VerticalProductCard";

const CatgwiseSearch = () => {
  const { product } = useParams();

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [brands, setBrands] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleSorting = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setShowProfileMenu(!showProfileMenu);

    if (value === "asc") {
      setResult((prev) => prev.sort((a, b) => a.price?.sell - b.price?.sell));
      return;
    }
    if (value === "dsc") {
      setResult((prev) => prev.sort((a, b) => b.price?.sell - a.price?.sell));
      return;
    }
  };

  const handleSearchQuery = useCallback(async () => {
    let response = await fetch(SummaryApi.search_by_catg.url + `/${product}`, {
      method: SummaryApi.search_by_catg.method,
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    if (response.success) {
      setResult(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    handleSearchQuery();
  }, [handleSearchQuery]);

  useEffect(() => {
    if (result?.length > 0) {
      const setOfBrands = new Set();
      result?.forEach((product) => setOfBrands.add(product?.brand));
      const arrayOfBrands = [...setOfBrands];
      setBrands(arrayOfBrands);
    }
  }, [result]);

  useEffect(() => {}, [sortBy]);

  useEffect(() => {
    setSortBy(selectedBrand);
    setShowProfileMenu(false);

    setResult((prev) =>
      prev.sort((a, b) => {
        if (a.brand === selectedBrand && b.brand !== selectedBrand) {
          return -1;
        } else if (a.brand !== selectedBrand && b.brand === selectedBrand) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }, [selectedBrand]);

  return (
    <div className="w-full flex justify-between text-white">
      <div
        className={`fixed md:sticky top-12 2xl:top-16 h-full flex flex-col transition-transform duration-500 ease-in-out md:transition-none ${
          showProfileMenu
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } min-h-screen w-full min-[320px]:max-w-60 md:max-w-52 lg:max-w-60 z-10 bg-zinc-800 border-r-2 border-stone-500 shadow-lg`}
      >
        <div className="w-full p-4 mt-2 flex flex-col justify-center">
          <label className="text-xl">Sort by :</label>
          <div className="w-full mt-1 h-0.5 bg-zinc-500"></div>
        </div>

        <form className="w-full px-4 flex flex-col justify-center gap-4">
          <div className="flex gap-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              id="ascending"
              value="asc"
              onChange={handleSorting}
              className="w-4"
            />
            <label htmlFor="ascending">Price - Low to High</label>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              id="descending"
              value="dsc"
              onChange={handleSorting}
              className="w-4"
            />
            <label htmlFor="descending">Price - High to Low</label>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-lg">Brand</label>
            <select
              name="brand"
              id="brand"
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-stone-700 p-1 rounded-md outline-none border-2 border-zinc-500 no-scrollbar"
            >
              {brands?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="w-full p-1 mt-2 sm:mt-0 sm:p-4">
      <div className="w-full flex justify-between items-center pl-2 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
          <span className="text-xl md:text-2xl font-semibold py-1">
            Search Result :{" "}
            {result?.reduce((acc, product) => {
              return acc + product?.variants?.length;
            }, 0)}
          </span>

          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex sm:hidden justify-center w-full max-w-24 py-1.5 text-center rounded-full bg-stone-700"
          >
            Sort by
          </button>
        </div>

        <div className="w-full flex gap-4">
          <div className="w-full bg-stone-500 rounded-xl border-2 border-zinc-400">
            {loading ? (
              <VPLoader />
            ) : result?.length === 0 ? (
              <div className="w-full text-lg xl:text-2xl p-2 font-semibold flex justify-center items-center text-center h-80 bg-stone-700 rounded-xl">
                No Products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  p-2 lg:p-4 gap-4 lg:gap-8">
                {result?.map((product) =>
                  product?.variants?.map((variant, vindex) => (
                    <VerticalProductCard
                      key={vindex}
                      product={product}
                      variant={variant}
                      variantIndex={vindex}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatgwiseSearch;
