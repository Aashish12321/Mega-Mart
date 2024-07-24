import React, { useCallback, useEffect, useRef, useState } from "react";
import SummaryApi from "../Common";
import ProductLoader from "./Loaders/ProductLoader";
import ProductCard from "./ProductCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CategorywiseProducts = ({ category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const HorizontalScroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

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
    <div className="px-2 py-4">
      <div className="flex justify-between">
        <div className="text-white text-xl font-semibold">{heading}</div>
        <div>
          <button
            onClick={() => HorizontalScroll(-200)}
            className="text-gray-200 text-2xl top-24 md:top-28 bg-zinc-800"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={() => HorizontalScroll(200)}
            className="text-gray-200 text-2xl ml-2 top-24 md:top-28 bg-zinc-800"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 p-4 items-center overflow-auto no-scrollbar scroll-smooth"
      >
        {loading ? (
          <ProductLoader wrap={""} />
        ) : (
          products.map((product, index) =>
            product.variants.map((variant, variantIndex) => (
              <ProductCard
                key={variant._id}
                product={product}
                variant={variant}
                variantIndex={variantIndex}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default CategorywiseProducts;
