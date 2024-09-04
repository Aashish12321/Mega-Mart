import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import displayNepCurrency from "../../helpers/displayNepCurrency";
import { toast } from "react-toastify";
import { MdDiscount } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import Spinner from "../../Components/Loaders/Spinner";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [estimateDelivery, setEstimatedDelivery] = useState("");

  const { orderId } = useParams();

  const fetchOrder = useCallback(async () => {
    let response = await fetch(
      SummaryApi.customer_order_details.url + `/${orderId}`,
      {
        method: SummaryApi.customer_order_details.method,
        headers: {
          "content-type": "application/json",
          authorization: `${token}`,
        },
      }
    );

    response = await response.json();
    if (response.success) {
      setOrder(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }, [token, orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (order?._id) {
      let dateCreation = new Date(order?.createdAt);
      const newDate = dateCreation.setDate(dateCreation.getDate() + 7);
      setEstimatedDelivery(newDate);
    }
  }, [order]);

  return (
    <div className="m-2 md:p-2">
      <div className="w-full text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Order</span>
      </div>
      {loading ? (
        <Spinner />
      ) : order?._id ? (
        <div className="w-full p-2 mt-1 bg-stone-700 border-2 border-zinc-400 rounded-xl">
          <div className="w-full flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col gap-4">
              <i className="text-xl font-semibold">Order ID : #{order?._id}</i>
              <span className="text-lg font-semibold">
                <i className="mr-2">Status :</i>
                {order?.status === "Processing" ? (
                  <i className="px-4 py-1 font-Roboto font-semibold bg-orange-200 text-orange-600 rounded-lg">
                    Processing
                  </i>
                ) : order?.status === "Shipped" ? (
                  <i className="px-4 py-1 font-Roboto font-semibold bg-blue-200 text-blue-600 rounded-lg">
                    Shipped
                  </i>
                ) : (
                  order?.status === "Delivered" && (
                    <i className="px-4 py-1 font-Roboto font-semibold bg-green-200 text-green-600 rounded-lg">
                      Delivered
                    </i>
                  )
                )}
              </span>
              <span className="flex flex-col w-full max-w-lg text-wrap">
                <i className="w-full max-w-xs text-lg font-semibold">
                  Shipping Address :
                </i>
                <i className="text-wrap">{order?.address}</i>
              </span>
            </div>
            <div className="flex flex-col md:items-end gap-4 text-lg">
              <i className="hidden md:flex">
                {new Date(order?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </i>
              {order?.isDelivered ? (
                <span className="flex flex-col font-semibold md:justify-end">
                  <i className="mr-1">Delivered At :</i>
                  <i className="w-fit px-4 py-1 font-Roboto bg-green-200 text-green-600 rounded-lg">
                    {moment(order?.deliveredAt).format("ll")}
                  </i>
                </span>
              ) : (
                <span className="flex flex-col font-semibold md:justify-end">
                  <i className="mr-1">Estimated delivery :</i>
                  <i className="w-fit px-4 py-1 font-Roboto bg-green-200 text-green-600 rounded-lg">
                    {moment(estimateDelivery).format("ll")}
                  </i>
                </span>
              )}
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-4 border-b-2 border-zinc-400">
              Ordered Items
            </h2>
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

                  <span className="flex flex-col w-full text-wrap md:mx-2">
                    <Link
                      to={`/product/${product?._id}/${product?.variants[0]?._id}`}
                      className="line-clamp-1 text-md font-semibold hover:text-gray-300"
                    >
                      {product?.name}
                    </Link>
                    {product?.variants[0]?.specs[0]?.size && (
                      <span className="flex w-full text-md gap-1 md:gap-4 items-center">
                        <span className="w-6">Size</span>
                        <span> : </span>
                        <span>{product?.variants[0]?.specs[0]?.size}</span>
                      </span>
                    )}
                    <span className="flex w-full text-md gap-1 md:gap-4 items-center">
                      <span className="w-6">Qty</span>
                      <span> : </span>
                      <span>{product?.quantity}</span>
                    </span>
                    <span className="flex w-full text-md gap-1 md:gap-4 items-center">
                      <span className="w-6">Price</span>
                      <span> : </span>
                      <span>
                        {displayNepCurrency(parseInt(product?.price?.sell))}
                      </span>
                    </span>
                  </span>
                  {/* </div> */}
                  <div className="text-right">
                    <p>
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
            <div className="text-xl text-center font-semibold">Summary</div>
            <div className="w-full flex justify-between text-lg py-1 border-b-2 border-zinc-500">
              <span>Subtotal</span>
              <span>{displayNepCurrency(order?.subTotal)}</span>
            </div>
            {order?.couponDiscount > 0 && (
              <div className="w-full flex justify-between text-lg  py-1 border-b-2 border-zinc-500">
                <span className="flex items-center gap-1">
                  <MdDiscount /> Coupon Discount
                </span>
                <span>- {displayNepCurrency(order?.couponDiscount)}</span>
              </div>
            )}
            {order?.shippingCharge && (
              <div className="w-full flex justify-between text-lg  py-1 border-b-2 border-zinc-500">
                <span className="flex items-center gap-1">
                  <FaTruck /> Shipping Charge
                </span>
                <span>+ {displayNepCurrency(order?.shippingCharge)}</span>
              </div>
            )}
            <div className="w-full flex justify-between text-lg font-semibold py-1 border-zinc-500">
              <span>Total</span>
              <span>{displayNepCurrency(order?.total)}</span>
            </div>
          </div>

          <div className="w-full h-20"></div>
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
