import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../Components/Loaders/Spinner";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/selector";
import { MdEditSquare } from "react-icons/md";
import OrderStatusUpdate from "../../Components/OrderStatusUpdate";
import SuborderStatusUpdate from "../../Components/SuborderStatusUpdate";

const AllOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const user = useSelector(selectUser);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [updateOrder, setUpdateOrder] = useState({});

  const fetchAllOrders = useCallback(async () => {
    let response = await fetch(SummaryApi.all_orders.url, {
      method: SummaryApi.all_orders.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setOrders(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);
  return (
    <div className="m-2 md:p-2">
      <div className="w-full text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>All Orders</span>
      </div>

      {loading ? (
        <Spinner />
      ) : orders?.length === 0 ? (
        <div className="w-full text-xl p-2 text-center font-semibold flex justify-center items-center h-80 my-2 bg-stone-700 rounded-xl border-2 border-zinc-400">
          No Orders yet ! <br /> Browse our collections and buy something you
          want at an exclusive price and bumper discounts {":)"}
        </div>
      ) : (
        <div className="overflow-x-auto p-1 bg-stone-700 border-2 border-zinc-400 rounded-xl">
          <table className="w-full bg-stone-700 rounded-xl">
            <thead className="w-full">
              <tr className="w-full md:text-lg text-gray-300">
                <th>S.N.</th>
                <th>ORDERS</th>
                <th>DATE</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
                <th>UPDATE</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  className="w-full select-none border-t-2 border-gray-500"
                >
                  <td className="text-center p-2">{index + 1}.</td>
                  <td>
                    <Link
                      to={
                        user?.role === "ADMIN"
                          ? `${order?._id}/suborders`
                          : `suborder/${order?._id}`
                      }
                      className="text-center p-2 hover:text-gray-300 cursor-pointer"
                    >
                      {order?._id}
                    </Link>
                  </td>
                  <td className="text-center p-2">
                    {moment(order?.createdAt).format("ll")}
                  </td>
                  <td className="text-center p-2 ">
                    {order?.payment?.isPaid ? (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-green-200 text-green-600 rounded-lg">
                        Paid
                      </i>
                    ) : (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-red-200 text-red-600 rounded-lg">
                        Unpaid
                      </i>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {order?.status === "Processing" ? (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-orange-200 text-orange-600 rounded-lg">
                        Processing
                      </i>
                    ) : order?.status === "Shipped" ? (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-blue-200 text-blue-600 rounded-lg">
                        Shipped
                      </i>
                    ) : order?.status === "Delivered" && (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-green-200 text-green-600 rounded-lg">
                        Delivered
                      </i>
                    )}
                  </td>
                  <td className="text-center p-2">
                    <button
                      onClick={() => {
                        setUpdateOrder(order);
                        setShowUpdateBox(true);
                      }}
                      className="text-green-400 text-2xl text-center mx-auto"
                    >
                      <MdEditSquare />
                    </button>
                    {user?.role === "VENDOR" && showUpdateBox && (
                      <SuborderStatusUpdate
                        suborder={updateOrder}
                        onClose={() => setShowUpdateBox(false)}
                        callFunc={fetchAllOrders}
                      />
                    )}
                    {user?.role === "ADMIN" && showUpdateBox && (
                      <OrderStatusUpdate
                        order={updateOrder}
                        onClose={() => setShowUpdateBox(false)}
                        callFunc={fetchAllOrders}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
