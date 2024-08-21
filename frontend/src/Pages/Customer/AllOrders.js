import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../Components/Loaders/Spinner";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchAllOrders = useCallback(async () => {
    let response = await fetch(SummaryApi.view_all_orders.url, {
      method: SummaryApi.view_all_orders.method,
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
        <div className="bg-stone-700 border-2 border-zinc-400 rounded-xl">
          <table className="w-full bg-stone-700 rounded-xl">
            <thead className="w-full">
              <tr className="w-full md:text-lg text-gray-300">
                <th>S.N.</th>
                <th>ORDER</th>
                <th>DATE</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  onClick={(e) => navigate(`order/${order?._id}`)}
                  className="w-full select-none border-t-2 border-gray-500 hover:text-gray-300 cursor-pointer"
                >
                  <td className="text-center p-2">{index+1}.</td>
                  <td className="text-center p-2">{order?._id}</td>
                  <td className="text-center p-2">
                    {new Date(order?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-center p-2 ">
                    {order?.payment?.isPaid ? (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-green-200 text-green-600 rounded-lg">Paid</i>
                    ) : (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-red-200 text-red-600 rounded-lg">Not Paid</i>
                    )}
                  </td>
                  <td className="text-center p-2">{order?.status}</td>
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
