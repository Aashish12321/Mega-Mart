import React, { useCallback, useEffect, useRef, useState } from "react";
import SummaryApi from "../Common";
import HorizontalProductCard from "./HorizontalProductCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import HPLoader from "./Loaders/HPLoader";

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
    <div className="px-2 py-4">
      <div className="w-full flex justify-between text-xl lg:text-2xl p-1 font-semibold">
        <div className="text-white text-xl font-semibold">{heading}</div>
        <div>
          <button
            onClick={() => HorizontalScroll(-250)}
            className="text-gray-200 text-2xl top-24 md:top-28 bg-zinc-800"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={() => HorizontalScroll(250)}
            className="text-gray-200 text-2xl ml-2 top-24 md:top-28 bg-zinc-800"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-8 py-4 items-center overflow-auto no-scrollbar scroll-smooth"
      >
        {loading ? (
          <HPLoader wrap={""} />
        ) : (
          products.map((product) =>
            product.variants.map((variant, variantIndex) => (
              <HorizontalProductCard
                key={variantIndex}
                product={product}
                variant={variant}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default CategorywiseProducts;
