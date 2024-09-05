import React, { useContext, useEffect, useState } from "react";
import displayNepCurrency from "../helpers/displayNepCurrency";
import StarRating from "./StarRating";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import addToFavourite from "../helpers/addToFavourite";
import Context from "../Context/Context";

const VerticalProductCard = ({ product, variant }) => {
  const context = useContext(Context);
  const {
    fetchCartProducts,
    fetchFavouriteProducts,
    cartProducts,
    favouriteProducts,
  } = context;

  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleProductToCart = async (e) => {
    await addToCart(e, product?._id, variant?._id, variant?.specs[0]?._id);
    fetchCartProducts();
  };

  const handleProductToFavourite = async (e) => {
    await addToFavourite(e, product?._id, variant?._id);
    fetchFavouriteProducts();
  };

  useEffect(() => {
    const isProductInCart = cartProducts?.some(
      (product) => product?.variantId === variant?._id
    );
    setIsAddedToCart(isProductInCart);

    const isProductInFavourite = favouriteProducts?.some(
      (product) => product?.variantId === variant?._id
    );
    setIsFavourite(isProductInFavourite);
  }, [favouriteProducts, cartProducts, variant]);

  return (
    <Link to={`/product/${product?._id}/${variant?._id}`}>
      <div
        onClick={()=> window.scrollTo({top:0})}
        className="shadow-custom bg-stone-700 duration-300 ease-in-out rounded-lg cursor-pointer"
      >
        <div className="relative h-36 min-[375px]:h-44 md:h-48 lg:h-52 xl:h-56 bg-zinc-800 rounded-t-lg">
          <img
            key={variant?._id}
            src={variant?.images[0]}
            className="w-full h-full object-contain mx-auto rounded-t-lg md:scale-95 md:hover:scale-100 duration-200 ease-in-out"
            alt="product.jpg"
          />
          <button
            onClick={handleProductToFavourite}
            className={`absolute left-1 top-1 text-xs ${
              isFavourite ? "text-red-500" : "text-gray-400"
            } bg-gray-200 rounded-full p-1 md:hover:scale-110`}
          >
            <FaHeart />
          </button>
        </div>

        <div className="relative h-36">
          <div className="mx-2">
            <h1 className="text-ellipsis line-clamp-2">{product?.name}</h1>
            <div className="flex gap-1 md:gap-2">
              <StarRating rating={product?.ratings?.avgRating} dimension={"13px"} />
              {/* <span className="mt-0.5">{product?.ratings?.avgRating}/5 ({product?.ratings?.ratingCount})</span> */}
            </div>

            <div className="flex justify-between">
              <p className="font-semibold text-lg text-green-400">
                {displayNepCurrency(product?.price?.sell)}
              </p>
            </div>
            <div className="flex">
              {product.discount && (
                <p className=" font-light line-through text-red-400">
                  {displayNepCurrency(product?.price?.mrp)}
                </p>
              )}
              {product.discount ? (
                <p className="text-yellow-300">&nbsp;-{product?.discount}%</p>
              ) : (
                <br />
              )}
            </div>
          </div>
          <button
            onClick={handleProductToCart}
            className={`flex absolute right-0 bottom-0 items-center ${
              isAddedToCart ? "bg-green-500" : "bg-gray-400"
            } rounded-tl-lg rounded-br-lg p-2`}
          >
            <FaCartShopping />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default VerticalProductCard;
