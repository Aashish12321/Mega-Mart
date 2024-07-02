import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayNepCurrency from "../helpers/displayNepCurrency";
const AdminProductCard = ({ product, fetchAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div>
      <div className="w-44 shadow-custom cursor-pointer bg-custom rounded-lg">
        <div className="w-full h-44 bg-zinc-800 rounded-t-lg">
          <img
            src={product.images[0]}
            className="w-full h-full object-contain mx-auto rounded-t-lg"
            alt="product.jpg"
          />
        </div>
        
        <div className="mx-2 h-24">
          <h1 className="text-ellipsis line-clamp-2">{product.name}</h1>
          <div className="flex justify-between">
            <p className="font-semibold text-lg text-green-400" >
              {
                displayNepCurrency(product.sellingPrice)
              }
            </p>
          </div>
          <div className="flex">
            {
              product.discount && <p className="line-through text-red-400">NPR {product.markedPrice}</p>
            }
            {
              product.discount? <p className="text-yellow-300">&nbsp;&nbsp;-{product.discount}%</p> 
              : 
              <br />
            }
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
