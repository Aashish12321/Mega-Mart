import React from "react";
import displayNepCurrency from "../helpers/displayNepCurrency";
import StarRating from "./StarRating";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const ProductCard = ({ product, variant, variantIndex}) => {
  return (
    <Link to={`product/${product?._id}/${variant?._id}`}>
      <div className="w-44 md:w-48 lg:w-52 xl:w-56 shadow-custom bg-customCard duration-300 ease-in-out rounded-lg cursor-pointer">
        <div className="relative h-44 md:h-48 lg:h-52 xl:h-56 bg-zinc-800 rounded-t-lg">
          <img
            key={variantIndex}
            src={variant.images[0]}
            className="w-full h-full object-contain mx-auto rounded-t-lg md:scale-95 md:hover:scale-100 duration-200 ease-in-out"
            alt="product.jpg"
          />
          <button className="absolute left-1 top-1 text-xs text-red-500 bg-gray-200 rounded-full p-1 md:hover:scale-110">
            <FaHeart />
          </button>
        </div>

        <div className="relative h-36">
          <div className="mx-2">
            <h1 className="text-ellipsis line-clamp-2">{product.name}</h1>
            <div className="flex gap-1 md:gap-2">
              {/* <StarRating rating={product.ratings.average} /> */}
              {/* <span className="mt-0.5">{product.ratings.average}/5 ({product.ratings.total})</span> */}
              <StarRating rating={4.5} />
              {/* <span className="mt-0.5 font-light">
              {4.5}/5({50})
            </span> */} 
            </div>

            <div className="flex justify-between">
              <p className="font-semibold text-lg text-green-400">
                {displayNepCurrency(product.price.sell)}
              </p>
            </div>
            <div className="flex">
              {product.discount && (
                <p className=" font-light line-through text-red-400">
                  {displayNepCurrency(product.price.mrp)}
                </p>
              )}
              {product.discount ? (
                <p className="text-yellow-300">
                  &nbsp;-{product.discount}%
                </p>
              ) : (
                <br />
              )}
            </div>
          </div>
          <button onClick={(e)=> addToCart(e, product?._id, variant?._id)} className="flex absolute right-0 bottom-0 items-center bg-green-500 rounded-tl-lg rounded-br-lg p-2">
            <FaCartShopping />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
