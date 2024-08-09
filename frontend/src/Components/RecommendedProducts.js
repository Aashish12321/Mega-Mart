import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../Common";
import ProductLoader from "./Loaders/ProductLoader";
import RecommendedProductCard from "./RecommendedProductCard";

const RecommendedProducts = ({ vid, category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.catgwiseproducts.url, {
      method: SummaryApi.catgwiseproducts.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ category: category }),
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-12 xl:gap-16 py-4 items-center">
        {loading ? (
          <ProductLoader wrap={"flex-wrap"} />
        ) : (
          products?.map((product, index) =>
            product.variants?.map(
              (variant, variantIndex) =>
                variant?._id !== vid && (
                  <RecommendedProductCard
                    key={variantIndex}
                    product={product}
                    variant={variant}
                  />
                )
            )
          )
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
