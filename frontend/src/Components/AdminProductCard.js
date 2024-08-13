import React from "react";
import { MdEdit } from "react-icons/md";
import displayNepCurrency from "../helpers/displayNepCurrency";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";

const AdminProductCard = ({ product, variant, variantIndex }) => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="shadow-custom bg-stone-700 duration-300 ease-in-out rounded-lg cursor-pointer">
        <div
          onClick={() => navigate(`/product/${product?._id}/${variant?._id}`)}
          className="h-36 min-[375px]:h-44 lg:h-52 xl:h-56 bg-zinc-800 rounded-t-lg"
        >
          <img
            key={variantIndex}
            src={variant.images[0]}
            className="w-full h-full object-contain mx-auto rounded-t-lg scale-95 hover:scale-100 duration-200 ease-in-out"
            alt="product.jpg"
          />
        </div>

        <div className="relative h-36">
          <div
            onClick={() => navigate(`/product/${product?._id}/${variant?._id}`)}
            className="mx-2 cursor-pointer"
          >
            <h1 className="text-ellipsis line-clamp-1 min-[375px]:line-clamp-2">{product.name}</h1>
            <div className="flex gap-1 md:gap-2">
              {/* <StarRating rating={product.ratings.average} /> */}
              {/* <span className="mt-0.5">{product.ratings.average}/5 ({product.ratings.total})</span> */}
              <StarRating rating={4.5} dimension={"13px"} />
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
                <p className="line-through text-red-400">
                  {displayNepCurrency(product.price.mrp)}
                </p>
              )}
              {product.discount ? (
                <p className="text-yellow-300">
                  &nbsp;&nbsp;-{product.discount}%
                </p>
              ) : (
                <br />
              )}
            </div>
          </div>
          <Link
            to={`/admin/product/${product?._id}/edit`}
            className="absolute right-0 bottom-0"
          >
            <div className="w-fit p-1 text-white bg-green-400 ml-auto cursor-pointer hover:bg-green-900 rounded-br-lg rounded-tl-lg">
              <MdEdit />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
