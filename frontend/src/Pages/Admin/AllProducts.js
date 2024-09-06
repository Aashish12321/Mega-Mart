import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import AdminProductCard from "../../Components/AdminProductCard";
import VPLoader from "../../Components/Loaders/VPLoader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("token");

  const handleAllProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.all_products.url, {
      method: SummaryApi.all_products.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });

    response = await response.json();
    if (response.success) {
      setLoader(false);
      setProducts(response.data);
    }
  }, [token]);

  useEffect(() => {
    handleAllProducts();
  }, [handleAllProducts]);

  return (
    <div className="m-2 md:p-2">
      <div className="flex justify-between px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
        <span className="text-xl font-bold">All Products</span>
        <span className="text-xl font-semibold">
          {products?.length} Products
        </span>
      </div>

      <div className="bg-stone-500 rounded-xl border-2 border-zinc-400">
        {loader ? (
          <VPLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 p-2 lg:p-4 gap-4 lg:gap-8">
            {products.map((product) =>
              product.variants.map((variant, variantIndex) => (
                <AdminProductCard
                  key={variant?._id}
                  product={product}
                  variant={variant}
                  variantIndex={variantIndex}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
