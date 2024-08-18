// import React, { useCallback, useEffect, useState } from "react";
// import SummaryApi from "../Common";
// import displayNepCurrency from "../helpers/displayNepCurrency";
// import { toast } from "react-toastify";

// const OrderDetails = () => {
//   const [order, setOrder] = useState({});
//   const token = localStorage.getItem("token");

//   const fetchOrder = useCallback(async () => {
//     let response = await fetch(SummaryApi.view_order.url, {
//       method: SummaryApi.view_order.method,
//       headers: {
//         "content-type": "application/json",
//         authorization: `${token}`,
//       },
//     });

//     response = await response.json();
//     if (response.success) {
//       setOrder(response.data);
//       // toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-white bg-stone-700 shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-6">Order Details</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//         <p>
//           <strong>Order Id:</strong> {order?._id}
//         </p>
//         <p>
//           <strong>Order Date:</strong>{" "}
//           {new Date(order?.createdAt).toLocaleDateString()}
//         </p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
//         <p>
//           <strong>Shipping Address:</strong> {order?.address}
//         </p>
//         <p>
//           <strong>Payment Method:</strong> {order?.payment?.method}
//         </p>
//         <p>
//           <strong>Payment Status:</strong>{" "}
//           {order?.payment?.isPaid ? "Paid" : "Pending"}
//         </p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Ordered Items</h2>
//         <ul>
//           {order?.products?.map((product, index) => (
//             <li
//               key={index}
//               className="flex flex-col sm:flex-row items-center mb-4 border-b pb-4"
//             >
//               <img
//                 src={product?.variants[0]?.images[0]}
//                 alt={product?.name}
//                 className="w-full sm:w-20 h-20 object-cover mb-4 sm:mb-0 sm:mr-4"
//               />
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold">{product?.name}</h3>
//                 {product?.variants[0]?.specs[0]?.size && (
//                   <p>
//                     <strong>Size:</strong>{" "}
//                     {product?.variants[0]?.specs[0]?.size}
//                   </p>
//                 )}
//                 <p>
//                   <strong>Quantity:</strong> {product?.quantity}
//                 </p>
//                 <p>
//                   <strong>Price:</strong>{" "}
//                   {displayNepCurrency(product?.price?.sell)}
//                 </p>
//                 <p>
//                   <strong>Subtotal:</strong>{" "}
//                   {displayNepCurrency(product?.quantity * product?.price?.sell)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Total Price</h2>
//         <p className="text-xl font-bold">
//           {displayNepCurrency(order?.totalPrice + order?.couponDiscount)}
//         </p>
//         <p className="text-xl font-bold">
//           {displayNepCurrency(order?.couponDiscount)}
//         </p>
//         <p className="text-xl font-bold">
//           {displayNepCurrency(order?.totalPrice)}
//         </p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Order Status</h2>
//         <p>
//           <strong>Status:</strong> {order?.status}
//         </p>
//         {order?.isDelivered && (
//           <p>
//             <strong>Delivered At:</strong>{" "}
//             {new Date(order.deliveredAt).toLocaleDateString()}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
//         <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//           Contact Support
//         </button>
//         <button className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
//           Return Policy
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../Common";
import displayNepCurrency from "../helpers/displayNepCurrency";
import { toast } from "react-toastify";
import { FaTruck, FaFileInvoice } from "react-icons/fa";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const token = localStorage.getItem("token");

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
      // toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-stone-700 text-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order ID: {order?._id}</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
            <FaFileInvoice className="mr-2" /> Invoice
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
            <FaTruck className="mr-2" /> Track order
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Order date: {new Date(order?.createdAt).toLocaleDateString()}
      </p>
      <p className="text-green-600 font-semibold mb-6">
        Estimated delivery: May 14, 2022
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
        <ul>
          {order?.products?.map((product, index) => (
            <li
              key={index}
              className="flex items-center mb-4 pb-4 border-b border-gray-200"
            >
              <span className="w-full max-w-28 max-h-28">
                <img
                  src={product?.variants[0]?.images[0]}
                  alt={product?.name}
                  className="w-full max-h-28 mr-4 object-contain bg-zinc-800"
                />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product?.name}</h3>
                {product?.variants[0]?.specs[0]?.size && (
                  <p>
                    <strong>Size:</strong>{" "}
                    {product?.variants[0]?.specs[0]?.size}
                  </p>
                )}
                <p>
                  <strong>Quantity:</strong> {product?.quantity}
                </p>
                <p>
                  <strong>Price:</strong>{" "}
                  {displayNepCurrency(product?.price?.sell)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {displayNepCurrency(product?.quantity * product?.price?.sell)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Total Price</h2>
        <p className="text-xl font-bold">
          {displayNepCurrency(order?.totalPrice + order?.couponDiscount)}
        </p>
        <p className="text-lg">
          Discount: {displayNepCurrency(order?.couponDiscount)}
        </p>
        <p className="text-xl font-bold">
          {displayNepCurrency(order?.totalPrice)}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Status</h2>
        <p>
          <strong>Status:</strong> {order?.status}
        </p>
        {order?.isDelivered && (
          <p>
            <strong>Delivered At:</strong>{" "}
            {new Date(order.deliveredAt).toLocaleDateString()}
          </p>
        )}
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
  );
};

export default OrderDetails;
