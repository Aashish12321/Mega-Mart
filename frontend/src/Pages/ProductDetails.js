import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../Common";
import Spinner from "../Components/Loaders/Spinner";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import displayNepCurrency from "../helpers/displayNepCurrency";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { pid, vid } = params;
  // console.log(pid, vid);

  const scrollRef = useRef(null);
  const HorizontalScroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const fetchDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.productdetails.url, {
      method: SummaryApi.productdetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: pid }),
    });

    response = await response.json();
    if (response.success) {
      setProduct(response.data);
      setLoading(false);
    }
  }, [pid]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="w-full h-[100vh] pt-1  lg:p-2 xl:p-6 text-white">
      {loading ? (
        <Spinner />
      ) : (
        <div className="lg:flex gap-4">
          <div className="w-full">
            {product.variants.map(
              (variant, vindex) =>
                variant._id === vid && (
                  <div className="w-full flex lg:justify-center lg:gap-1 ">
                    <div className="w-auto h-[500px] overflow-auto no-scrollbar my-1">
                      {variant.images.map((image, imgindex) => (
                        <div
                          key={imgindex}
                          className="hidden lg:flex w-full max-w-32 mb-1 justify-center object-contain bg-zinc-800 border-2 border-transparent hover:border-red-500"
                        >
                          <img
                            src={image}
                            alt={"image " + imgindex}
                            className="max-h-32"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="relative lg:hidden h-fit">
                      <div
                        ref={scrollRef}
                        className="flex gap-1 overflow-auto no-scrollbar scroll-smooth"
                      >
                        {variant.images.map((image, imgindex) => (
                          <div
                            key={imgindex}
                            className="flex-shrink-0 flex w-full justify-center object-contain bg-zinc-800 "
                          >
                            <img
                              src={image}
                              alt={"image " + imgindex}
                              className="max-h-80"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => HorizontalScroll(-window.innerWidth)}
                        className="absolute left-0 top-[50%] text-gray-200 text-3xl bg-customCard"
                      >
                        <MdKeyboardArrowLeft />
                      </button>
                      <button
                        onClick={() => HorizontalScroll(window.innerWidth)}
                        className="absolute right-0 top-[50%] text-gray-200 text-3xl bg-customCard"
                      >
                        <MdKeyboardArrowRight />
                      </button>
                    </div>

                    <div className="hidden lg:flex w-full max-w-[480px] items-center my-1 justify-center object-contain bg-zinc-800 border-2 border-transparent hover:border-red-500">
                      <img
                        src={variant.images[0]}
                        alt={"images 0.jpg"}
                        className="h-[480px]"
                      />
                    </div>
                  </div>
                )
            )}
          </div>

          <div className="w-full max-w-3xl top-0 bg-customCard my-1 p-4">
            <div>{product.brand}</div>
            <div className="text-lg line-clamp-2">{product.name}</div>
            <div className="flex mt-1 gap-4">
              <span className="flex items-center bg-green-500 py-0.5 px-2 gap-2 rounded-md">
                4.8 <FaRegStar />
              </span>
              <span>
                {product.ratings.total} Ratings &{" "}
                {product.customerReviews.length} Reviews
              </span>
            </div>
            <div className="text-green-400  mt-2">
              Extra {displayNepCurrency(product.price.mrp - product.price.sell)}{" "}
              off
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-semibold">
                {displayNepCurrency(product.price.sell)}
              </div>
              <div className="text-red-500 line-through ">
                {displayNepCurrency(product.price.mrp)}
              </div>
              <div className="text-yellow-400">{product.discount}% off</div>
            </div>
            <div className="flex mt-4">
              {product.variants.length > 1 && (
                <div className="flex gap-4 items-center">
                  <span>Colors: </span>
                  {product.variants.map((variant, vindex) => (
                    <div className="bg-zinc-800">
                      <img
                        key={vindex}
                        src={variant.images[0]}
                        alt={"images" + vindex}
                        className="w-24"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
