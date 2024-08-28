import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../Components/Loaders/Spinner";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { MdEditSquare } from "react-icons/md";
import SuborderStatusUpdate from "../../Components/SuborderStatusUpdate";

const Suborders = () => {
  const [loading, setLoading] = useState(true);
  const [suborders, setSuborders] = useState([]);
  const token = localStorage.getItem("token");
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [updateSuborder, setUpdateSuborder] = useState({});

  const { orderId } = useParams();

  const fetchSubOrders = useCallback(async () => {
    let response = await fetch(SummaryApi.sub_orders.url + `/${orderId}`, {
      method: SummaryApi.sub_orders.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setSuborders(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token, orderId]);

  useEffect(() => {
    fetchSubOrders();
  }, [fetchSubOrders]);
  return (
    <div className="m-2 md:p-2">
      <div className="w-full text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Suborders</span>
      </div>

      {loading ? (
        <Spinner />
      ) : suborders?.length === 0 ? (
        <div className="w-full text-xl p-2 text-center font-semibold flex justify-center items-center h-80 my-2 bg-stone-700 rounded-xl border-2 border-zinc-400">
          No Suborders exists for this main order. Something goes wrong !
        </div>
      ) : (
        <div className="overflow-x-auto p-1 bg-stone-700 border-2 border-zinc-400 rounded-xl">
          <table className="w-full bg-stone-700 rounded-xl">
            <thead className="w-full">
              <tr className="w-full md:text-lg text-gray-300">
                <th>S.N.</th>
                <th>SUB ORDERS</th>
                <th>MAIN ORDER</th>
                <th>SELLER</th>
                <th>STATUS</th>
                <th>UPDATE</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {suborders?.map((suborder, index) => (
                <tr
                  key={suborder?._id}
                  className="w-full select-none border-t-2 border-gray-500"
                >
                  <td className="text-center p-2">{index + 1}.</td>
                  <td className="text-center p-2">
                    <Link
                      to={`${suborder?._id}/details`}
                      className="hover:text-gray-300 cursor-pointer"
                    >
                      {suborder?._id}
                    </Link>
                  </td>
                  <td className="text-center p-2">
                    <Link
                      to={`/admin/all-orders/${suborder?.mainOrder}/details`}
                      className="hover:text-gray-300 cursor-pointer"
                    >
                      {suborder?.mainOrder}
                    </Link>
                  </td>
                  <td className="text-center p-2">{suborder?.seller?.name}</td>
                  <td className="text-center p-2">
                    {suborder?.status === "Completed" ? (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-blue-200 text-blue-600 rounded-lg">
                        Completed
                      </i>
                    ) : (
                      <i className="px-4 py-1 font-Roboto font-semibold bg-orange-200 text-orange-600 rounded-lg">
                        Processing
                      </i>
                    )}
                  </td>
                  <td className="text-center p-2 z-20">
                    <button
                      onClick={() => {
                        setUpdateSuborder(suborder);
                        setShowUpdateBox(true);
                      }}
                      className="z-20 text-green-400 text-2xl text-center mx-auto"
                    >
                      <MdEditSquare />
                    </button>
                    {showUpdateBox && (
                      <SuborderStatusUpdate
                        suborder={updateSuborder}
                        onClose={() => setShowUpdateBox(false)}
                        callFunc={fetchSubOrders}
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

export default Suborders;
