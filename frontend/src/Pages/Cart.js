import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context/index";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import displayNepCurrency from "../helpers/displayNepCurrency";
import addToCart from "../helpers/addToCart";
import Spinner from "../Components/Loaders/Spinner";

const Cart = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { cartProducts, fetchCartProducts } = context;
  const [remove, setRemove] = useState({});

  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const checkQuantity = (pid, vid, sid, quantity) => {
    let product = products?.find((product) => product?._id === pid);
    let variant = product?.variants?.find((variant) => variant?._id === vid);
    let spec = variant?.specs?.find((spec) => spec?._id === sid);
    let result = quantity > 0 && quantity <= spec?.stock;
    // console.log("data are: ", product, variant, spec, quantity, result);
    return result;
  };

  const updateQuantityInCart = async (variantId, specId, quantity) => {
    let response = await fetch(SummaryApi.update_cart.url, {
      method: SummaryApi.update_cart.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        variantId: variantId,
        specId: specId,
        quantity: quantity,
      }),
    });
    response = await response.json();
    if (response.success) {
      fetchCartProducts();
    }
  };

  const removeItemFromCart = async (e, pid, vid, sid) => {
    setRemove((remove) => ({ ...remove, [sid]: true }));
    await addToCart(e, pid, vid, sid);
    fetchCartProducts();
  };

  const fetchCartProductsDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.cart_products_details.url, {
      method: SummaryApi.cart_products_details.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setProducts(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      fetchCartProductsDetails();
    }
  }, [cartProducts, fetchCartProductsDetails]);

  return (
    <div className="w-full text-white">
      <div className="flex mx-12 justify-between text-2xl font-semibold py-2 border-b-2 border-gray-700">
        <span>Shopping Cart</span>
        <span>{cartProducts.length} Items</span>
      </div>

      <div className="mx-12">
        {cartProducts?.length === 0 ? (
          <div className="w-full text-xl flex justify-center items-center h-80 my-2 bg-customCard rounded-xl">
            No items in cart !
          </div>
        ) : loading ? <Spinner /> : 
        (
          <table className="my-2 w-full bg-customCard">
            <thead className="w-full">
              <tr className="w-full text-lg text-gray-300 border-b-2">
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {cartProducts?.map((cartVariant) =>
                products?.map((product, pindex) =>
                  product?.variants?.map(
                    (variant) =>
                      variant?._id === cartVariant?.variantId &&
                      variant?.specs.map(
                        (spec) =>
                          spec?._id === cartVariant?.specId && (
                            <tr
                              key={spec?._id}
                              style={{
                                animation:
                                  remove[spec?._id] && "slideLeft 0.8s ease-in",
                              }}
                              className="border-b-2 border-gray-500"
                            >
                              <td className="bg-customCard p-2">
                                <Link
                                  to={`/product/${product?._id}/${variant?._id}`}
                                  className="flex object-contain"
                                >
                                  <span className="w-full max-w-28 max-h-28">
                                    <img
                                      src={variant?.images[0]}
                                      alt={`CartProduct ${pindex}`}
                                      className="w-full h-full object-contain bg-gray-300"
                                    />
                                  </span>
                                  <span className="w-full max-w-sm inline-block text-wrap mx-4">
                                    <span className=" hover:text-red-500">{product?.name}</span>
                                    {spec?.size && (
                                      <span className="flex font-bold w-full gap-4 items-center">
                                        <span>Size</span>
                                        <span> : </span>
                                        <span>{spec?.size}</span>
                                      </span>
                                    )}
                                    <span className="w-full flex mt-2 gap-4">
                                      <button
                                        onClick={(e) =>
                                          removeItemFromCart(
                                            e,
                                            product?._id,
                                            variant?._id,
                                            spec?._id
                                          )
                                        }
                                        className="bg-red-500 w-20 py-1 text-sm text-white rounded-full shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                                      >
                                        Remove
                                      </button>
                                    </span>
                                  </span>
                                </Link>
                              </td>
                              <td className="text-center">
                                <span className="px-4 py-2">
                                  <span
                                    onClick={() => {
                                      let check = checkQuantity(
                                        cartVariant?.productId,
                                        cartVariant?.variantId,
                                        cartVariant?.specId,
                                        cartVariant?.quantity - 1
                                      );
                                      if (check) {
                                        updateQuantityInCart(
                                          cartVariant?.variantId,
                                          cartVariant?.specId,
                                          cartVariant?.quantity - 1
                                        );
                                      }
                                    }}
                                    className="text-2xl cursor-pointer"
                                  >
                                    -
                                  </span>
                                  <span className="text-2xl bg-zinc-800 px-4 mx-4">
                                    {cartVariant?.quantity}
                                  </span>
                                  <span
                                    onClick={() => {
                                      let check = checkQuantity(
                                        cartVariant?.productId,
                                        cartVariant?.variantId,
                                        cartVariant?.specId,
                                        cartVariant?.quantity + 1
                                      );
                                      if (check) {
                                        updateQuantityInCart(
                                          cartVariant?.variantId,
                                          cartVariant?.specId,
                                          cartVariant?.quantity + 1
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
                                <span>
                                  {displayNepCurrency(
                                    parseInt(cartVariant?.quantity) *
                                      product?.price?.sell
                                  )}
                                </span>
                              </td>
                            </tr>
                          )
                      )
                  )
                )
              )}
            </tbody>
          </table>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default Cart;
