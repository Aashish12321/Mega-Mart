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
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState({});
  const { cartProducts } = context;

  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCouponCode = async () => {
    let response = await fetch(SummaryApi.check_coupon.url, {
      method: SummaryApi.check_coupon.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ couponCode: couponCode, products: products }),
    });
    response = await response.json();
    if (response.success) {
      setCoupon(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

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
    fetchcartProductsDetails();
  }, [fetchcartProductsDetails]);

  useEffect(() => {
    if (products?.length > 0) {
      let total = 0;
      cartProducts?.forEach((cartProduct) => {
        products?.forEach((product) => {
          if (cartProduct?.variantId === product?.variants[0]?._id) {
            total += cartProduct?.quantity * product?.price?.sell;
          }
        });
      });
      setSubTotal(total);
      setTotal(total - (coupon?.discountAmount || 0));
    }
  }, [cartProducts, products, coupon]);

  return (
    <div className="w-full p-1 md:p-4 xl:px-12 xl:py-4 text-white">
      <div className="w-full text-xl md:mb-4 p-1 font-semibold text-center border-2 border-stone-400 bg-zinc-700">
        Products Checkout
      </div>
      {cartProducts?.length > 0 ? (
        loading ? (
          <Spinner />
        ) : (
          <div className="w-full flex flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:gap-4">
              <div className="w-full flex flex-col p-2 border-2 border-stone-400 bg-stone-700">
                <div className="p-1">
                  <div className="flex p-2 justify-between border-b-2 border-zinc-500">
                    <span className="text-xl font-semibold">
                      Shipping Address *
                    </span>
                    <Link
                      // to={`/product/${pid}/${vid}/add-review`}
                      className="flex px-2 py-1 text-center bg-stone-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
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
                    <span className="text-md font-semibold">
                      Mobile Number *
                    </span>
                    <div className="text-md">number goes here</div>
                  </div>
                  <div className="my-4 border-2 p-1 border-zinc-500">
                    <span className="text-md font-semibold">Email *</span>
                    <div className="text-md">Email goes here</div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col p-2 border-2 border-stone-400 bg-stone-700">
                <span className="flex p-2 gap-4 items-center text-xl font-semibold border-b-2 border-zinc-500">
                  <FaCreditCard /> Debit/Credit Card
                </span>
                <div className="px-2 w-full">
                  <div className="flex flex-col w-full my-2 p-1">
                    <span className="text-md font-semibold">
                      Enter Card Number *
                    </span>
                    <input
                      type="number"
                      className="w-full p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                      placeholder="Eg:  1234 1234 1234"
                    />
                  </div>
                  <div className="w-full flex flex-col lg:flex-row justify-between gap-6 my-4 p-1">
                    <div className="w-full flex flex-col">
                      <span className="text-md font-semibold">
                        Expiry Date *
                      </span>
                      <input
                        type="number"
                        className="w-full p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                        placeholder="Eg:  MM/YYYY"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="text-md font-semibold">CVV *</span>
                      <input
                        type="number"
                        className="w-full p-1 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800 "
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full p-2 max-w-2xl gap-4 border-2 border-stone-400 bg-stone-700">
              <div className="flex w-full justify-between p-2 border-b-2 border-zinc-500">
                <span className="text-xl font-semibold">Order Details</span>
                <span className="text-xl font-semibold">
                  {cartProducts?.reduce(
                    (acc, cartProduct) => acc + cartProduct?.quantity,
                    0
                  )}{" "}
                  Items
                </span>
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
                                  className="flex flex-row object-contain gap-2 md:gap-0"
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
              <div className="flex justify-end">
                <input
                  type="text"
                  value={couponCode}
                  name="couponCode"
                  autoComplete="off"
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="px-3 py-1 outline-none rounded-l-full border-2 border-zinc-500 bg-zinc-800 "
                  placeholder="Have Coupon code?"
                />
                <button
                  onClick={handleCouponCode}
                  className="flex px-3 py-1 justify-center rounded-r-full items-center bg-green-500"
                >
                  Apply
                </button>
              </div>
              <div className="w-full flex flex-col items-center px-2 lg:px-12 gap-2">
                <div className="text-xl text-center font-semibold">Summary</div>
                <div className="w-full flex justify-between font-semibold py-1 border-b-2 border-zinc-500">
                  <span>Subtotal</span>
                  <span>{displayNepCurrency(subTotal)}</span>
                </div>
                {coupon?.discountAmount && (
                  <div className="w-full flex justify-between font-semibold py-1 border-b-2 border-zinc-500">
                    <span>Coupon discount</span>
                    <span>- {displayNepCurrency(coupon?.discountAmount)}</span>
                  </div>
                )}
                <div className="w-full flex justify-between font-semibold py-1 border-zinc-500">
                  <span>Total</span>
                  <span>{displayNepCurrency(total)}</span>
                </div>
                <button className="flex w-full max-w-36 p-1 justify-center rounded-full bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all">
                  Make payment
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center items-center h-96 p-2 md:p-4 xl:px-12 text-white bg-stone-700 rounded-lg">
          <span className="font-semibold text-lg">
            No treasures here yet! Browse our collections and add something
            delightful to your cart
          </span>
        </div>
      )}
    </div>
  );
};

export default Checkout;
