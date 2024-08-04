import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context";
import ProductCard from "../Components/ProductCard";
import ProductLoader from "../Components/Loaders/ProductLoader";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const { favouriteProducts, fetchFavouriteProducts } = context;
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
    <div className="md:mx-6 px-2 py-4 text-white">
      <div className="flex justify-between text-2xl font-semibold py-2 border-b-2 border-gray-700">
        <span>Favourites</span>
        <span>{favouriteProducts.length} Items</span>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-6 py-4 items-center overflow-auto no-scrollbar scroll-smooth">
        {favouriteProducts?.length === 0 ? (
          <div className="w-full text-xl flex justify-center items-center h-80 my-2 bg-customCard rounded-xl">
            No items in Favourites !
          </div>
        ) : loading ? (
          <ProductLoader wrap={"flex-wrap"} />
        ) : (
          products?.map((product, pindex) =>
            product.variants.map((variant, vindex) => (
              <ProductCard
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
