import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import displayNepCurrency from "../../helpers/displayNepCurrency";
import addToCart from "../../helpers/addToCart";
import Spinner from "../../Components/Loaders/Spinner";

const Cart = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { cartProducts, fetchCartProducts } = context;
  const [remove, setRemove] = useState({});

  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const checkQuantity = (pid, vid, sid, quantity) => {
    let product = products?.find(
      (product) =>
        product?._id === pid &&
        product?.variants[0]?._id === vid &&
        product?.variants[0]?.specs[0]?._id === sid
    );
    let variant = product?.variants[0];
    let spec = variant?.specs[0];
    let result = quantity > 0 && quantity <= spec?.available;
    if (quantity === 0) {
      toast.info("Minimum quantity must be 1.");
    }
    if (quantity > spec?.available) {
      toast.info("We have limited stock for this product");
    }
    return result;
  };

  const updateQuantityInCart = async (
    productId,
    variantId,
    specId,
    quantity
  ) => {
    let response = await fetch(SummaryApi.update_cart.url, {
      method: SummaryApi.update_cart.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        productId: productId,
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
    if (cartProducts?.length > 0) {
      fetchCartProductsDetails();
    }
  }, [cartProducts, fetchCartProductsDetails]);

  return (
    <div className="m-2 md:p-2">
      <div className="w-full flex justify-between text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Shopping Cart</span>
        <span>
          {cartProducts?.reduce(
            (acc, cartProduct) => acc + cartProduct?.quantity,
            0
          )}{" "}
          Items
        </span>
      </div>

      {cartProducts?.length === 0 ? (
        <div className="w-full text-lg xl:text-xl p-2 text-center font-semibold flex justify-center items-center h-80 my-2 bg-stone-700 rounded-xl border-2 border-zinc-400">
          No treasures here yet ! <br /> Browse our collections and add
          something delightful to your cart {":)"}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="bg-stone-700 border-2 border-zinc-400 rounded-xl">
          <table className="w-full bg-stone-800 rounded-xl">
            <thead className="w-full">
              <tr className="w-full md:text-lg text-gray-300">
                <th className="p-2">PRODUCT</th>
                <th className="hidden md:flex py-2 text-center">QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody className="w-full bg-stone-700">
              {products?.map((product, pindex) =>
                product?.variants?.map((variant) =>
                  variant?.specs?.map((spec) => (
                    <tr
                      key={spec?._id}
                      style={{
                        animation:
                          remove[spec?._id] && "slideLeft 0.8s ease-out",
                      }}
                      className="select-none border-t-2 border-gray-500"
                    >
                      <td className="p-2">
                        <Link
                          to={`/product/${product?._id}/${variant?._id}`}
                          className="flex flex-col md:flex-row object-contain"
                        >
                          <span className="w-full flex items-center max-w-28 max-h-28 bg-gray-300">
                            <img
                              src={variant?.images[0]}
                              alt={`CartProduct ${pindex}`}
                              className="w-full max-h-28 object-contain"
                            />
                          </span>
                          <span className="w-full max-w-sm inline-block text-wrap md:mx-4">
                            <span className="line-clamp-2 md:line-clamp-none hover:text-gray-300">
                              {product?.name}
                            </span>
                            {spec?.size && (
                              <span className="flex font-bold w-full gap-1 md:gap-4 items-center">
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
                        <span className="flex md:hidden mt-4">
                          <span
                            onClick={() => {
                              let check = checkQuantity(
                                product?._id,
                                variant?._id,
                                spec?._id,
                                product?.quantity - 1
                              );
                              if (check) {
                                updateQuantityInCart(
                                  product?._id,
                                  variant?._id,
                                  spec?._id,
                                  product?.quantity - 1
                                );
                              }
                            }}
                            className="text-2xl select-none active:text-red-500 cursor-pointer font-bold bg-zinc-800 px-2 border border-gray-500"
                          >
                            -
                          </span>
                          <span className="text-2xl select-none bg-zinc-800 px-2 border border-gray-500">
                            {product?.quantity}
                          </span>
                          <span
                            onClick={() => {
                              let check = checkQuantity(
                                product?._id,
                                variant?._id,
                                spec?._id,
                                product?.quantity + 1
                              );
                              if (check) {
                                updateQuantityInCart(
                                  product?._id,
                                  variant?._id,
                                  spec?._id,
                                  product?.quantity + 1
                                );
                              }
                            }}
                            className="text-2xl select-none active:text-green-500 cursor-pointer bg-zinc-800 px-2 border border-gray-500"
                          >
                            +
                          </span>
                        </span>
                      </td>
                      <td className="hidden md:table-cell text-center p-2">
                        <span className="flex">
                          <span
                            onClick={() => {
                              let check = checkQuantity(
                                product?._id,
                                variant?._id,
                                spec?._id,
                                product?.quantity - 1
                              );
                              if (check) {
                                updateQuantityInCart(
                                  product?._id,
                                  variant?._id,
                                  spec?._id,
                                  product?.quantity - 1
                                );
                              }
                            }}
                            className="text-2xl select-none active:text-red-500 cursor-pointer font-bold bg-zinc-800 px-2 border border-gray-500"
                          >
                            -
                          </span>
                          <span className="text-2xl bg-zinc-800 px-2 border border-gray-500">
                            {product?.quantity}
                          </span>
                          <span
                            onClick={() => {
                              let check = checkQuantity(
                                product?._id,
                                variant?._id,
                                spec?._id,
                                product?.quantity + 1
                              );
                              if (check) {
                                updateQuantityInCart(
                                  product?._id,
                                  variant?._id,
                                  spec?._id,
                                  product?.quantity + 1
                                );
                              }
                            }}
                            className="text-2xl select-none active:text-green-500 cursor-pointer bg-zinc-800 px-2 border border-gray-500"
                          >
                            +
                          </span>
                        </span>
                      </td>
                      <td className="text-center p-2">
                        {displayNepCurrency(product?.price?.sell)}
                      </td>
                      <td className="text-center p-2">
                        <span>
                          {displayNepCurrency(
                            parseInt(product?.quantity) * product?.price?.sell
                          )}
                        </span>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>

          <div className="w-full p-4 flex justify-center gap-4">
            <Link
              to={`/checkout`}
              className="flex justify-center bg-green-500 w-32 p-2 text-md font-semibold text-white rounded-full shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
