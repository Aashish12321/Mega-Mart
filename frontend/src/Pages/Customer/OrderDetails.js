import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import displayNepCurrency from "../../helpers/displayNepCurrency";
import { toast } from "react-toastify";
import { MdDiscount } from "react-icons/md";
import Spinner from "../../Components/Loaders/Spinner";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    let response = await fetch(SummaryApi.view_order.url, {
      method: SummaryApi.view_order.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });

    response = await response.json();
    if (response.success) {
      setOrder(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="m-2 md:p-2">
      <div className="w-full text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Order</span>
      </div>
      {loading ? (
        <Spinner />
      ) : order?._id ? (
        <div className="w-full p-2 font-semibold my-2 bg-stone-700 border-2 border-stone-400">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Order ID: {order?._id}</h1>
              <span className="text-xl font-semibold">
                Status: {order?.status}
              </span>
            </div>
            <div className="flex flex-col gap-4 text-lg text-end">
              <span className="mb-2">
                {new Date(order?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {order?.isDelivered ? (
                <span>
                  Delivered At:{" "}
                  {new Date(order?.deliveredAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              ) : (
                <span className="text-green-600 font-semibold mb-6">
                  Estimated delivery:{" "}
                  {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
            <ul>
              {order?.products?.map((product, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-500"
                >
                  <span className="w-full max-w-24 max-h-24">
                    <img
                      src={product?.variants[0]?.images[0]}
                      alt={product?.name}
                      className="w-full h-24 mr-4 object-contain bg-gray-400"
                    />
                  </span>

                  <span className="flex flex-col w-full text-wrap md:mx-4">
                    <span className="line-clamp-1 text-lg font-semibold hover:text-gray-300">
                      {product?.name}
                    </span>
                    {product?.variants[0]?.specs[0]?.size && (
                      <span className="flex font-semibold w-full text-md gap-1 md:gap-4 items-center">
                        <span className="w-6">Size</span>
                        <span> : </span>
                        <span>{product?.variants[0]?.specs[0]?.size}</span>
                      </span>
                    )}
                    <span className="flex font-semibold w-full text-md gap-1 md:gap-4 items-center">
                      <span className="w-6">Qty</span>
                      <span> : </span>
                      <span>{product?.quantity}</span>
                    </span>
                    <span className="flex font-semibold w-full text-md gap-1 md:gap-4 items-center">
                      <span className="w-6">Price</span>
                      <span> : </span>
                      <span>
                        {displayNepCurrency(parseInt(product?.price?.sell))}
                      </span>
                    </span>
                  </span>
                  {/* </div> */}
                  <div className="text-right">
                    <p className="font-semibold">
                      {displayNepCurrency(
                        product?.quantity * product?.price?.sell
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:max-w-4xl mx-auto flex flex-col items-center px-2 gap-2">
            <div className="text-2xl text-center font-semibold">Summary</div>
            <div className="w-full flex justify-between text-lg font-semibold py-1 border-b-2 border-zinc-500">
              <span>Subtotal</span>
              <span>
                {displayNepCurrency(order?.totalPrice + order?.couponDiscount)}
              </span>
            </div>
            {order?.couponDiscount && (
              <div className="w-full flex justify-between text-lg font-semibold py-1 border-b-2 border-zinc-500">
                <span className="flex items-center gap-1">
                  <MdDiscount /> Coupon discount
                </span>
                <span>- {displayNepCurrency(order?.couponDiscount)}</span>
              </div>
            )}
            <div className="w-full flex justify-between text-xl font-semibold py-1 border-zinc-500">
              <span>Total</span>
              <span>{displayNepCurrency(order?.totalPrice)}</span>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
              Return Policy
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full text-xl p-2 text-center font-semibold flex justify-center items-center h-80 my-2 bg-stone-700 rounded-xl border-2 border-zinc-400">
          Order do not exist
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
