import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../Common";
import VerticalProductCard from "./VerticalProductCard";
import VPLoader from "./Loaders/VPLoader";

const RecommendedProducts = ({ vid, category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.catgwiseproducts.url, {
      method: SummaryApi.catgwiseproducts.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ products: category }),
    });

    response = await response.json();
    if (response.success) {
      setLoading(false);
      setProducts(response.data);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-1">
      <div className="text-white text-xl font-semibold">{heading}</div>

      {loading ? (
        <VPLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-12 py-4">
          {products?.map((product) =>
            product.variants?.map(
              (variant, variantIndex) =>
                variant?._id !== vid && (
                  <VerticalProductCard
                    key={variantIndex}
                    product={product}
                    variant={variant}
                  />
                )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
