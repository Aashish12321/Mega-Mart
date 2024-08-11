import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayNepCurrency from "../helpers/displayNepCurrency";
import StarRating from "./StarRating";

const AdminProductCard = ({
  product,
  variant,
  variantIndex,
  fetchAllProducts,
}) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="">
      <div className="w-36 min-[375px]:w-40 md:w-36 lg:w-40 xl:w-44 shadow-custom bg-stone-600 duration-300 ease-in-out hover:scale-105 rounded-lg cursor-pointer">
        <div className="h-36 min-[375px]:h-40 md:h-36 lg:h-40 xl:h-44 bg-zinc-800 rounded-t-lg">
          <img
            key={variantIndex}
            src={variant.images[0]}
            className="w-full h-full object-contain mx-auto rounded-t-lg"
            alt="product.jpg"
          />
        </div>

        <div className="mx-2 h-32">
          <h1 className="text-ellipsis line-clamp-2">{product.name}</h1>
          <div className="flex gap-1 md:gap-2">
            {/* <StarRating rating={product.ratings.average} /> */}
            {/* <span className="mt-0.5">{product.ratings.average}/5 ({product.ratings.total})</span> */}
            <StarRating rating={4.5} dimension={"13px"}/>
            <span className="mt-0.5 font-light">
              {4.5}/5({50})
            </span>
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
        <div
          className="w-fit p-1 text-white bg-green-400 ml-auto cursor-pointer hover:bg-green-900 rounded-br-lg rounded-tl-lg"
          onClick={() => setEditProduct(!editProduct)}
        >
          <MdEdit />
        </div>
      </div>  

      <div>
        {editProduct && (
          <AdminEditProduct
            productData={product}
            onClose={() => setEditProduct(false)}
            fetchAllProducts={fetchAllProducts}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
