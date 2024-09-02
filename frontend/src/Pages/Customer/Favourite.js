import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../../Context";
import VerticalProductCard from "../../Components/VerticalProductCard";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import VPLoader from "../../Components/Loaders/VPLoader";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const { favouriteProducts } = context;
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavouriteProductsDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.favourite_products_details.url, {
      method: SummaryApi.favourite_products_details.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setProducts(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    if (favouriteProducts?.length > 0) {
      fetchFavouriteProductsDetails();
    }
  }, [favouriteProducts, fetchFavouriteProductsDetails]);

  return (
    <div className="m-2 md:p-2">
      <div className="w-full flex justify-between text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Favourites</span>
        <span>{favouriteProducts?.length} Items</span>
      </div>

      <div className="bg-stone-500 rounded-xl border-2 border-zinc-400">
      {loading ? (
        <VPLoader />
      ) : favouriteProducts?.length === 0 ? (
        <div className="w-full text-lg xl:text-2xl p-2 font-semibold flex justify-center items-center text-center h-80 bg-stone-700 rounded-xl">
          Looks like you have not added products so far ! <br /> Browse our collections and add something you wish to buy.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-2 lg:p-4 gap-4 lg:gap-8">
          {products?.map((product, _) =>
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

export default Favourite;
