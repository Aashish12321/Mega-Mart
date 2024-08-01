import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context/index";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import displayNepCurrency from "../helpers/displayNepCurrency";

const Cart = () => {
  const context = useContext(Context);
  const { cartProducts, fetchCartProducts } = context;
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const checkQuantity = (pid, vid, sid, quantity) => {
    let product = products?.find((product) => product?._id === pid);
    let variant = product?.variants?.find((variant) => variant?._id === vid);
    let spec = variant?.specs?.find((spec) => spec?._id === sid);
    let result = quantity <= spec?.stock;
    // console.log("data are: ", product, variant, spec, quantity, result);
    return result;
  };

  const updateQuantityInCart = async (variantId, quantity) => {
    let response = await fetch(SummaryApi.update_cart.url, {
      method: SummaryApi.update_cart.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ variantId: variantId, quantity: quantity }),
    });
    response = await response.json();
    if (response.success) {
      fetchCartProducts();
    }

  };

  const fetchCartProductsDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.cart_products_details.url, {
      method: SummaryApi.cart_products_details.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(cartProducts),
    });
    response = await response.json();
    if (response.success) {
      setProducts(response.data);
    } else {
      toast.error(response.message);
    }
  }, [cartProducts, token]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      fetchCartProductsDetails();
    }
  }, [cartProducts, fetchCartProductsDetails]);

  return (
    <div className="w-full text-white">
      <div className="mx-12">   
      <div className="flex justify-between text-2xl font-semibold py-2 border-b-2 border-gray-700">
        <span>Shopping Cart</span>
        <span>{cartProducts.length} Items</span>
      </div>
      <table className="my-2 w-full bg-customCard">
        <thead className="w-full">
          <tr className="w-full text-lg text-gray-300">
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts?.map((cartVariant, _) =>
            products?.map((product, pindex) =>
              product?.variants?.map((variant, vindex) =>
                variant.specs.map(
                  (spec) =>
                    variant?._id === cartVariant.variantId && (
                      <tr key={pindex} className="">
                        <td className="bg-customCard">
                          <Link to={`/product/${product._id}/${variant._id}`} className="flex object-contain">
                            <img
                              src={variant?.images[0]}
                              alt={`CartProduct ${pindex}`}
                              className="w-20"
                            />
                            <span className="w-40 text-wrap m-4">{product?.name}</span>
                          </Link>
                        </td>
                        <td className="text-center">
                          <span className="bg-zinc-800 px-4 py-2">
                            <span
                              onClick={() => {
                                let check = checkQuantity(
                                  cartVariant?.productId,
                                  cartVariant?.variantId,
                                  spec?._id,
                                  parseInt(cartVariant?.quantity) - 1
                                );
                                if (check) {
                                  updateQuantityInCart(
                                    cartVariant?.variantId,
                                    parseInt(cartVariant?.quantity) - 1
                                  );
                                }
                              }}
                              className="text-2xl cursor-pointer"
                            >
                              -
                            </span>
                            <span className="text-2xl mx-4">
                              {parseInt(cartVariant?.quantity)}
                            </span>
                            <span
                              onClick={() => {
                                let check = checkQuantity(
                                  cartVariant?.productId,
                                  cartVariant?.variantId,
                                  spec?._id,
                                  parseInt(cartVariant?.quantity) + 1
                                );
                                if (check) {
                                  updateQuantityInCart(
                                    cartVariant?.variantId,
                                    parseInt(cartVariant?.quantity) + 1
                                  );
                                }
                              }}
                              className="text-2xl cursor-pointer"
                            >
                              +
                            </span>
                          </span>
                        </td>
                        <td className="text-center">
                          {displayNepCurrency(product?.price?.sell)}
                        </td>
                        <td className="text-center">
                          {displayNepCurrency(
                            parseInt(cartVariant?.quantity) *
                              product?.price?.sell
                          )}
                        </td>
                      </tr>
                    )
                )
              )
            )
          )}
        </tbody>
      </table>
      <div></div>
      </div>
    </div>
  );
};

export default Cart;
