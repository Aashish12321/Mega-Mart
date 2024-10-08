import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../Common";
import Spinner from "../Components/Loaders/Spinner";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import displayNepCurrency from "../helpers/displayNepCurrency";
import { FaCartShopping, FaHeart, FaRegStar } from "react-icons/fa6";
import { GiElectric } from "react-icons/gi";
import addToCart from "../helpers/addToCart";
import addToFavourite from "../helpers/addToFavourite";
import Context from "../Context/Context";
import ProductReviews from "../Components/ProductReviews";
import RecommendedProducts from "../Components/RecommendedProducts";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [product, setProduct] = useState({
    variants: [],
    size: [],
  });
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [variantImagesCount, setVariantImagesCount] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [expandDesc, setExpandDesc] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [specId, setSpecId] = useState("");
  const [showSize, setShowSize] = useState(false);

  const params = useParams();
  const { pid, vid } = params;

  const context = useContext(Context);
  const {
    fetchCartProducts,
    fetchFavouriteProducts,
    cartProducts,
    favouriteProducts,
  } = context;

  const handleSpecIdChange = (e) => {
    setSpecId(e.target.value);
  };

  const handleProductToCart = async (e) => {
    for (const variant of product?.variants) {
      if (variant?._id === vid) {
        for (const spec of variant?.specs) {
          if (spec?._id === specId && spec?.available === 0) {
            toast.info("This product is out of stock");
            return;
          } 
        }
      }
    }
    await addToCart(e, pid, vid, specId);
    fetchCartProducts();
  };

  const handleProductToFavourite = async (e) => {
    await addToFavourite(e, pid, vid);
    fetchFavouriteProducts();
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [imgCoordinate, setImgCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const handleZoomImage = useCallback((e) => {
    setImageZoom(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setImgCoordinate({ x, y });
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevious();
    }
  };

  const handleNext = () => {
    if (currentImgIndex < variantImagesCount - 1) {
      setCurrentImgIndex(currentImgIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImgIndex > 0) {
      setCurrentImgIndex(currentImgIndex - 1);
    }
  };

  const fetchDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.productdetails.url, {
      method: SummaryApi.productdetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ pid: pid }),
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

  useEffect(() => {
    if (product?.variants?.length > 0) {
      product?.variants?.forEach((variant) => {
        if (variant?._id === vid) {
          setVariantImagesCount(variant?.images?.length);
          if (variant?.specs?.length > 1) {
            setShowSize(true);
          }
        }
      });
    }

    const isProductInFavourite = favouriteProducts?.some(
      (product) => product?.variantId === vid
    );
    setIsFavourite(isProductInFavourite);
  }, [product, vid, specId, favouriteProducts]);

  useEffect(() => {
    product?.variants?.forEach((variant) => {
      if (variant?._id === vid) {
        setSpecId(variant?.specs[0]?._id);
      }
    });
  }, [product, vid]);

  useEffect(() => {
    if (showSize) {
      const isProductInCart = cartProducts?.some(
        (product) => product?.variantId === vid && product?.specId === specId
      );
      setIsAddedToCart(isProductInCart);
    } else {
      const isProductInCart = cartProducts?.some(
        (product) => product?.variantId === vid
      );
      setIsAddedToCart(isProductInCart);
    }
  }, [vid, specId, cartProducts, showSize]);

  return (
    <div className="w-full lg:px-2 text-white">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="gap-2 lg:flex">
            <div className="w-full lg:max-w-2xl">
              {product?.variants?.map(
                (variant, vindex) =>
                  variant?._id === vid && (
                    <div
                      key={vindex}
                      className="w-full lg:justify-center lg:gap-1"
                    >
                      <div className="hidden lg:flex w-full max-w-2xl gap-2 select-none">
                        <div className="flex flex-col gap-2 overflow-auto lg:h-[400px] no-scrollbar my-1 ">
                          {variant.images.map((image, imgindex) => (
                            <div
                              key={imgindex}
                              onLoad={() => setLargeImage(variant.images[0])}
                              onClick={() => setLargeImage(image)}
                              className="hidden lg:flex w-full max-w-32 justify-center cursor-pointer bg-zinc-800 border-2 border-transparent hover:border-green-500"
                            >
                              <img
                                src={image}
                                alt={`images ${imgindex + 1}.webp`}
                                className="max-h-32 object-contain"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col w-full">
                          <div className="hidden lg:flex relative w-full h-[400px] items-center my-1 py-1 justify-center object-contain bg-zinc-800">
                            <button
                              onClick={handleProductToFavourite}
                              className={`absolute right-1 top-1 text-xs ${
                                isFavourite ? "text-red-500" : "text-gray-400"
                              } bg-gray-200 rounded-full p-1 md:hover:scale-110`}
                            >
                              <FaHeart />
                            </button>
                            <img
                              src={largeImage}
                              alt={"images 0.webp"}
                              className={`h-[396px] cursor-pointer object-scale-down`}
                              onMouseMove={handleZoomImage}
                              onMouseLeave={() => setImageZoom(false)}
                            />
                          </div>

                          <div className="flex w-full justify-between text-xl gap-1">
                            <button
                              onClick={(e) => {
                                handleProductToCart(e);
                                // , variant?.specs[0]?._id
                              }}
                              className="flex w-full p-2 gap-2 justify-center items-center bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                            >
                              {isAddedToCart ? "Added" : "Add to Cart "}
                              <FaCartShopping />
                            </button>
                            <button
                              onClick={() => {
                                toast.info(
                                  "This feature is under development. Please go through add to cart method"
                                );
                              }}
                              className="flex w-full p-2 gap-2 justify-center items-center bg-yellow-600 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                            >
                              Buy Now <GiElectric />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full relative lg:hidden h-fit">
                        <div
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          className="flex w-full justify-center object-contain gap-1 overflow-auto no-scrollbar scroll-smooth bg-zinc-800"
                        >
                          <img
                            src={variant?.images[currentImgIndex]}
                            alt={`images ${currentImgIndex + 1}.webp`}
                            className="h-80"
                          />
                        </div>

                        <button
                          onClick={handleProductToFavourite}
                          className={`absolute right-2 top-2 text-xs ${
                            isFavourite ? "text-red-500" : "text-gray-400"
                          } bg-gray-200 rounded-full p-1 md:hover:scale-110`}
                        >
                          <FaHeart />
                        </button>

                        <button
                          onClick={() =>
                            setCurrentImgIndex(currentImgIndex - 1)
                          }
                          className="absolute left-0 top-[50%] disabled:text-gray-500 text-gray-200 text-3xl bg-customCard"
                          disabled={currentImgIndex === 0}
                        >
                          <MdKeyboardArrowLeft />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImgIndex(currentImgIndex + 1)
                          }
                          className="absolute right-0 top-[50%] disabled:text-gray-500 text-gray-200 text-3xl bg-customCard"
                          disabled={currentImgIndex === variantImagesCount - 1}
                        >
                          <MdKeyboardArrowRight />
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>

            <div className="w-full flex flex-col flex-grow top-0 gap-1 p-1">
              <div className="relative flex flex-col p-4 gap-2 border-2 border-zinc-400 bg-stone-700">
                <div className="font-bold text-lg">{product?.brand}</div>
                <div className="text-lg line-clamp-2">{product?.name}</div>
                <div className="flex gap-4">
                  <span className="flex items-center bg-green-500 py-0.5 px-2 gap-2 rounded-md">
                    {product?.ratings?.avgRating} <IoStarSharp />
                  </span>
                  <span>
                    {product?.ratings?.ratingCount} Ratings &{" "}
                    {product?.ratings?.commentCount} Reviews
                  </span>
                </div>
                <div className="text-green-400">
                  Extra{" "}
                  {displayNepCurrency(
                    product?.price?.mrp - product?.price?.sell
                  )}{" "}
                  off
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-semibold">
                    {displayNepCurrency(product?.price?.sell)}
                  </div>
                  <div className="text-red-500 line-through ">
                    {displayNepCurrency(product?.price?.mrp)}
                  </div>
                  <div className="text-yellow-400">
                    {product?.discount}% off
                  </div>
                </div>
                <div>
                  {product?.variants?.map(
                    (variant) =>
                      variant?._id === vid &&
                      variant?.specs?.map(
                        (spec) =>
                          spec?._id === specId &&
                          spec?.available === 0 && (
                            <span className="bg-red-500 rounded-md px-2 py-1 font-semibold">
                              Out of Stock
                            </span>
                          )
                      )
                  )}
                </div>
                <div className="w-full">
                  {product?.variants?.length > 1 && (
                    <div className="flex w-full gap-4 items-center">
                      <span className="w-20 font-semibold">Colors</span>
                      <span> : </span>
                      <div className="flex flex-wrap bg-customCard gap-1">
                        {product?.variants?.map((variant, vindex) => (
                          <Link
                            key={vindex}
                            to={`/product/${pid}/${variant?._id}`}
                            className={`bg-zinc-800 border-2 
                            ${
                              variant?._id === vid
                                ? "border-green-500"
                                : "border-transparent"
                            }`}
                          >
                            <img
                              key={vindex}
                              src={variant?.images[0]}
                              alt={`images ${vindex + 1}`}
                              className="w-full max-w-20 md:max-w-24"
                              onClick={() => {
                                fetchCartProducts();
                                fetchFavouriteProducts();
                              }}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {showSize && (
                  <div className="flex w-full gap-4 items-center">
                    <label htmlFor="size" className="w-20 font-semibold">
                      Choose Size
                    </label>
                    <span> : </span>
                    <select
                      name="size"
                      id="size"
                      value={specId}
                      onChange={handleSpecIdChange}
                      className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      required
                    >
                      {product?.variants?.map(
                        (variant) =>
                          variant?._id === vid &&
                          variant?.specs?.map((spec, sindex) => (
                            <option key={sindex} value={spec?._id}>
                              {spec?.size}
                            </option>
                          ))
                      )}
                    </select>
                  </div>
                )}

                <div className="flex gap-4">
                  <span className="w-20 font-semibold">Seller</span>
                  <span> : </span>
                  <span>{product?.seller?.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 font-semibold">Description</span>
                  <span> : </span>
                  <span className="flex flex-col">
                    <div
                      onClick={() => setExpandDesc(!expandDesc)}
                      className={`font-Roboto ${
                        expandDesc ? "line-clamp-none" : "line-clamp-4"
                      } cursor-pointer`}
                    >
                      {product?.description}
                    </div>
                  </span>
                </div>

                {imageZoom && (
                  <div className="hidden lg:flex z-10 overflow-hidden absolute left-0 top-0 w-full h-[650px] bg-zinc-800 border-b-2 border-zinc-400">
                    <div
                      className="w-full h-full scale-110 scroll-smooth"
                      style={{
                        background: `url(${largeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${imgCoordinate.x * 100}% ${
                          imgCoordinate.y * 100
                        }% `,
                      }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="w-full mt-1 p-4 border-2 border-zinc-400 bg-stone-700">
                <div className="flex justify-between">
                  <span className="text-xl font-bold my-1">
                    Reviews and Ratings
                  </span>
                  <Link
                    to={`/product/${pid}/${vid}/add-review`}
                    className="flex p-2 gap-2 justify-center items-center bg-custom shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                  >
                    Rate Product <FaRegStar />
                  </Link>
                </div>
                <div className="mt-4">
                  <ProductReviews product={product} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 md:mx-6 ">
            <RecommendedProducts
              vid={vid}
              category={`${product?.products}`}
              heading={`Similar Products`}
            />
          </div>

          <div className="fixed z-20 bottom-0 lg:hidden flex w-full justify-between text-xl">
            <button
              onClick={handleProductToCart}
              className="flex w-full p-4 gap-2 justify-center items-center bg-green-500 active:translate-x-0.5 transition-all"
            >
              {isAddedToCart ? "Added" : "Add to Cart "}
              <FaCartShopping />
            </button>
            <button className="flex w-full p-4 gap-2 justify-center items-center bg-yellow-600 active:-translate-x-0.5 transition-all">
              Buy Now <GiElectric />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
