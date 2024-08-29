import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import VPLoader from "../Components/Loaders/VPLoader";
import VerticalProductCard from "../Components/VerticalProductCard";

const SearchProduct = () => {
  const location = useLocation();
  const query = new URLSearchParams(location?.search).get("query");

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchQuery = useCallback(async () => {
    let response = await fetch(SummaryApi.search_products.url + `/${query}`, {
      method: SummaryApi.search_products.method,
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
  }, [query]);

  useEffect(() => {
    handleSearchQuery();
  }, [handleSearchQuery]);

  return (
    <div className="text-white m-2 md:p-2">
      <div className="w-full flex justify-between text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>
          Search Results :{" "}
          {result?.reduce((acc, product) => {
            return acc + product?.variants?.length;
          }, 0)}
        </span>
      </div>

      <div className="bg-stone-500 rounded-xl border-2 border-zinc-400">
        {result?.length === 0 ? (
          <div className="w-full text-lg xl:text-2xl p-2 font-semibold flex justify-center items-center text-center h-80 bg-stone-700 rounded-xl">
            No Products found.
          </div>
        ) : loading ? (
          <VPLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  p-2 lg:p-4 gap-4 lg:gap-8 h-[calc(100vh-100px)] overflow-auto no-scrollbar">
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
  );
};

export default SearchProduct;
