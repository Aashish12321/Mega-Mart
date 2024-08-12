import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import SummaryApi from "../Common";
import Context from "../Context";
import { toast } from "react-toastify";
import Spinner from "../Components/Loaders/Spinner";
import displayNepCurrency from "../helpers/displayNepCurrency";

const Checkout = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { cartProducts } = context;

  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const fetchcartProductsDetails = useCallback(async () => {
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
      fetchcartProductsDetails();
    }
  }, [cartProducts, fetchcartProductsDetails]);

  useEffect(() => {
    if (products?.length > 0) {
      let total = 0;
      cartProducts?.forEach((cartProduct) => {
        products?.forEach((product) => {
          if (cartProduct?.variantId === product?.variants[0]?._id) {
            total += cartProduct?.quantity * parseInt(product?.price?.sell);
          }
        });
      });
      setSubTotal(total);
    }
  }, [cartProducts, products]);

  return (
    <div className="w-full p-2 md:p-4 xl:px-12 text-white">
      <div className="text-2xl font-semibold text-center">Product Checkout</div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-around w-full gap-4 border p-2">
          <div className="flex flex-col w-full p-2 max-w-2xl gap-4 border">
            <div className="flex flex-col p-2 w-full border bg-customCard">
              <div className="p-1">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">
                    Shipping Address *
                  </span>
                  <Link
                    // to={`/product/${pid}/${vid}/add-review`}
                    className="flex px-2 py-1 justify-center items-center bg-stone-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                  >
                    Change Address
                  </Link>
                </div>
                <div className="text-md my-2 border-2 p-1 border-zinc-500">
                  address goes here
                </div>
              </div>
              <div className="p-1">
                <span className="text-xl font-semibold">Contact Info</span>
                <div className="my-2 border-2 p-1 border-zinc-500">
                  <span className="text-md font-semibold">Mobile Number *</span>
                  <div className="text-md">number goes here</div>
                </div>
                <div className="my-4 border-2 p-1 border-zinc-500">
                  <span className="text-md font-semibold">Email *</span>
                  <div className="text-md">Email goes here</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-2 w-full border bg-customCard">
              <span className="flex p-2 gap-4 items-center text-xl font-semibold">
                <FaCreditCard /> Debit/Credit Card
              </span>
              <div className="px-2 w-full">
                <div className="flex flex-col w-full max-w-md my-2 p-1">
                  <span className="text-md font-semibold">
                    Enter Card Number *
                  </span>
                  <input
                    type="number"
                    className="p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                    placeholder="Eg:  1234 1234 1234"
                  />
                </div>
                <div className="flex justify-between w-full items-center">
                  <div className="flex w-full max-w-md justify-between my-4 p-1">
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">
                        Expiry Date *
                      </span>
                      <input
                        type="number"
                        className="p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                        placeholder="Eg:  MM/YYYY"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-md font-semibold">CVV *</span>
                      <input
                        type="number"
                        className="p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                  <button className="flex mt-4 p-1.5 justify-center items-center bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all">
                    Pay {`"Total amount"`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full p-2 max-w-2xl gap-4 border bg-customCard">
            <div className="flex w-full justify-between p-2 border-b-2 border-zinc-500">
              <span className="text-xl font-semibold">Order Details</span>
              <span className="text-xl font-semibold">{`${cartProducts?.length} Items`}</span>
            </div>
            <div className="">
              {cartProducts?.map((cartVariant) =>
                products?.map((product, pindex) =>
                  product?.variants?.map(
                    (variant) =>
                      variant?._id === cartVariant?.variantId &&
                      variant?.specs?.map(
                        (spec) =>
                          spec?._id === cartVariant?.specId && (
                            <div className="p-1 border-b-2 border-zinc-500">
                              <Link
                                to={`/product/${product?._id}/${variant?._id}`}
                                className="flex flex-col md:flex-row object-contain"
                              >
                                <span className="w-full max-w-20 max-h-20">
                                  <img
                                    src={variant?.images[0]}
                                    alt={`cartVariant ${pindex}`}
                                    className="w-full max-h-20 object-contain bg-gray-300"
                                  />
                                </span>
                                <span className="flex flex-col w-full max-w-sm text-wrap md:mx-4">
                                  <span className="line-clamp-1 text-sm font-semibold hover:text-gray-300">
                                    {product?.name}
                                  </span>
                                  {spec?.size && (
                                    <span className="flex font-semibold w-full text-sm gap-1 md:gap-4 items-center">
                                      <span className="w-6">Size</span>
                                      <span> : </span>
                                      <span>{spec?.size}</span>
                                    </span>
                                  )}
                                  <span className="flex font-semibold w-full text-sm gap-1 md:gap-4 items-center">
                                    <span className="w-6">Qty</span>
                                    <span> : </span>
                                    <span>{cartVariant?.quantity}</span>
                                  </span>
                                  <span className="flex font-semibold w-full text-sm gap-1 md:gap-4 items-center">
                                    <span className="w-6">Price</span>
                                    <span> : </span>
                                    <span>
                                      {displayNepCurrency(
                                        parseInt(product?.price?.sell)
                                      )}
                                    </span>
                                  </span>
                                </span>
                              </Link>
                            </div>
                          )
                      )
                  )
                )
              )}
            </div>
            <div className="w-full flex flex-col px-12 gap-2">
              <div className="text-xl text-center font-semibold">Summary</div>
              <div className="w-full flex justify-between font-semibold py-1 border-b-2 border-zinc-500">
                <span>Subtotal</span>
                <span>{displayNepCurrency(subTotal)}</span>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
