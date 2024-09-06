import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../Common";
import Context from "../Context/Context";
import { toast } from "react-toastify";
import Spinner from "../Components/Loaders/Spinner";
import displayNepCurrency from "../helpers/displayNepCurrency";
import PaymentForm from "../Components/PaymentForm";

// stripe payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/selector";
import MapComponent from "../Components/MapComponent";
import addToCart from "../helpers/addToCart";
const stripepromise = loadStripe(
  "pk_test_51PoJ9AEYPKZSSLXyZmNGBuLcc7NrlQHHB8HwaGS5QyKs9xN347cCZPPDMy92ANbMYyDw50eb7uSXXbAdLNpRKPPi00ZoB21PMn"
);

const Checkout = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState({});
  const { cartProducts, fetchCartProducts } = context;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({
    products: products,
    address: "",
    distance: 0,
    payment: {
      method: "Credit Card",
      id: "",
      isPaid: false,
      paidAt: "",
    },
    subTotal: 0,
    total: 0,
    coupon: "",
    couponDiscount: 0,
    totalWeight: 0,
    shippingCharge: 0,
  });

  const handleCouponCode = async () => {
    if (couponCode) {
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

  const removeProductFromCart = async (e) => {
    const removeProduct = async (cartProduct) => {
      await addToCart(e, cartProduct?.productId, cartProduct?.variantId, cartProduct?.specId);
      fetchCartProducts();
    }
    cartProducts?.forEach((cartProduct) => {
      removeProduct(cartProduct);
    })
  };

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

  const handleOrder = async () => {
    let response = await fetch(SummaryApi.create_order.url, {
      method: SummaryApi.create_order.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ order: order }),
    });

    response = await response.json();
    if (response.success) {
      toast.success(response.message);
      removeProductFromCart();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setOrder((prev) => ({
        ...prev,
        products: products,
        subTotal: subTotal,
        coupon: coupon?.code,
        couponDiscount: coupon?.discountAmount || 0,
        totalWeight: parseFloat(
          products?.reduce((acc, product) => {
            return acc + (product?.quantity * product?.weight) / 1000;
          }, 0)
        ).toFixed(3),
        total: total + prev?.shippingCharge,
      }));
    }
  }, [products, subTotal, total, coupon]);

  return (
    <div className="w-full p-1 md:p-4 xl:px-12 xl:py-4 text-white">
      <div className="w-full text-xl lg:text-2xl mb-4 p-1 font-semibold text-center border-2 border-stone-400 bg-stone-500">
        Products Checkout
      </div>
      {cartProducts?.length > 0 ? (
        loading ? (
          <Spinner />
        ) : (
          <div className="w-full flex flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:gap-4">
              <div className="w-full flex flex-col p-2 border-2 border-stone-400 bg-stone-700">
                <div className="px-1">
                  <div className="flex text-xl font-semibold p-2 justify-between border-b-2 border-zinc-500">
                    Shipping Address
                  </div>
                  <div className="text-md my-2">
                    <MapComponent setOrder={setOrder} />
                  </div>
                </div>
                <div className="p-1">
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xl font-semibold">Contact Info</span>
                    <Link
                      to={`/profile/account`}
                      className="w-full max-w-24 p-1 text-center rounded-full bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                    >
                      Change
                    </Link>
                  </div>
                  <div className="my-2 border-2 p-1 border-zinc-500">
                    <span className="text-md font-semibold">
                      Mobile Number *
                    </span>
                    <div className="text-md">{user?.mobileNumber}</div>
                  </div>
                  <div className="my-4 border-2 p-1 border-zinc-500">
                    <span className="text-md font-semibold">Email *</span>
                    <div className="text-md">{user?.email}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2 my-2 border-2 p-1 border-zinc-500">
                  <span className="text-md font-semibold">
                    Choose Payment Method *
                  </span>
                  <select
                    name="method"
                    id="method"
                    value={order?.payment?.method}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        payment: {
                          ...order.payment,
                          method: e.target.value,
                        },
                      })
                    }
                    className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg border-2 border-zinc-400"
                    required
                  >
                    {["Credit Card", "Cash on Delivery"].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  pointerEvents:
                    order?.payment?.method === "Credit Card" ? "auto" : "none",
                  opacity: order?.payment?.method === "Credit Card" ? 1 : 0.4,
                }}
                className="w-full flex flex-col p-2 border-2 border-stone-400 bg-stone-700"
              >
                <Elements stripe={stripepromise}>
                  <PaymentForm
                    total={total}
                    order={order}
                    setOrder={setOrder}
                    handleOrder={handleOrder}
                  />
                </Elements>
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
                                  <span className="w-full flex items-center max-w-20 max-h-20 bg-gray-300">
                                    <img
                                      src={variant?.images[0]}
                                      alt={`cartVariant ${pindex}`}
                                      className="w-full max-h-20 object-contain"
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
                    <span>Coupon Discount</span>
                    <span>- {displayNepCurrency(order?.couponDiscount)}</span>
                  </div>
                )}
                {order?.shippingCharge > 0 && (
                  <div className="w-full flex justify-between font-semibold py-1 border-b-2 border-zinc-500">
                    <span>Shipping Charge</span>
                    {/* <span>{order?.distance}</span> */}
                    {/* <span>{order?.totalWeight}</span> */}
                    <span>+ {displayNepCurrency(order?.shippingCharge)}</span>
                  </div>
                )}
                <div className="w-full flex justify-between font-semibold py-1 border-zinc-500">
                  <span>Total</span>
                  <span>{displayNepCurrency(order?.total)}</span>
                </div>
              </div>
              {order?.payment?.method === "Cash on Delivery" && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => {
                      if (order?.distance) {
                        handleOrder();
                        // toast.success("Order created");
                        navigate("/profile/orders");
                      } else {
                        toast.error("Please select shipping address");
                      }
                    }}
                    className="w-full max-w-36 p-1 text-center rounded-full bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                  >
                    Place Order
                  </button>
                </div>
              )}
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
