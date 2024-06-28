import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayNepCurrency from "../helpers/displayNepCurrency";
const AdminProductCard = ({ product, fetchAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div>
      <div className="w-44 h-auto shadow-custom bg-custom rounded-lg">
        <img
          src={product.images[0]}
          className="w-44 mx-auto rounded-t-lg object-fill"
          width={120}
          height={120}
          alt="product.jpg"
        />
        <div className="mx-2">
          <h1 className=" text-ellipsis line-clamp-2">{product.name}</h1>
          <div className="flex justify-between">
            <p className="font-bold text-green-400" >
              {
                displayNepCurrency(product.sellingPrice)
              }
            </p>
            <p className="line-through ">{product.markedPrice}</p>
          </div>
          <div>
            <p>{product.discount}% off</p>
          </div>
          

        </div>
        <div 
          className="w-fit p-1 text-white bg-green-400 ml-auto hover:bg-green-900 cursor-pointer rounded-br-lg rounded-tl-lg"
          onClick={() => setEditProduct(!editProduct)}
        >
          <MdEdit />
        </div>
      </div>

      <div>{editProduct && <AdminEditProduct productData={product} onClose={()=> setEditProduct(false)} fetchAllProducts={fetchAllProducts}/>}</div>
    </div>
  );
};

export default AdminProductCard;
