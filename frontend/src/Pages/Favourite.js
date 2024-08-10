import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context";
import VerticalProductCard from "../Components/VerticalProductCard";
import ProductLoader from "../Components/Loaders/ProductLoader";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

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
    <div className="w-full p-2 md:p-4 xl:px-12 text-white">
      <div className="flex justify-between text-2xl font-semibold py-2 border-b-2 border-gray-700 select-none">
        <span>Favourites</span>
        <span>{favouriteProducts?.length} Items</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-12 py-4">
        {favouriteProducts?.length === 0 ? (
          <div className="w-full text-xl flex justify-center items-center h-80 my-2 bg-customCard rounded-xl">
            No items in Favourites !
          </div>
        ) : loading ? (
          <ProductLoader wrap={"flex-wrap"} />
        ) : (
          products?.map((product, _) =>
            product?.variants?.map((variant, vindex) => (
              <VerticalProductCard
                key={vindex}
                product={product}
                variant={variant}
                variantIndex={vindex}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Favourite;
