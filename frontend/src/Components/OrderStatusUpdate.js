import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const OrderStatusUpdate = ({ order, onClose, callFunc }) => {
  const [status, setStatus] = useState(order?.status);
  let isPaid = order?.payment?.isPaid;
  const token = localStorage.getItem("token");

  const updateStatus = async () => {
    let response = await fetch(SummaryApi.update_order_status.url, {
      method: SummaryApi.update_order_status.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        orderId: order?._id,
        status: status,
        isPaid: isPaid,
      }),
    });

    response = await response.json();
    if (response.success) {
      toast.success(response.message);
      callFunc();
      onClose();
    }
    if (response.error) {
      toast.error(response.message);
      onClose();
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 text-white bg-stone-300 bg-opacity-30 flex justify-between items-center">
      <div className="mx-auto rounded-md bg-stone-700 p-4 w-full max-w-sm border-2 border-gray-300">
        <button onClick={onClose} className="text-lg ml-auto block">
          <FaRegWindowClose />
        </button>
        <h1 className="pb-4 text-lg font-medium text-center">Update Status</h1>
        <p className="text-start">
          <span>ORDER-ID : {order?._id}</span>
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p>Status :</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-stone-800 outline-none border px-4 py-1 rounded-full"
          >
            {["Processing", "Shipped", "Delivered"].map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        {order?.status === status ? (
          <button
            className="bg-red-500 opacity-40 w-28 h-8 rounded-2xl shadow-sm shadow-white mx-auto block mt-2"
            disabled
          >
            Update
          </button>
        ) : (
          <button
            onClick={updateStatus}
            className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all mx-auto block mt-2"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderStatusUpdate;
