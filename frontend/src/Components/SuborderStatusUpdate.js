import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const SuborderStatusUpdate = ({ suborder, onClose, callFunc }) => {
  const [status, setStatus] = useState(suborder?.status);

  const updateStatus = async () => {
    const token = localStorage.getItem("token");
    let response = await fetch(SummaryApi.update_suborder_status.url, {
      method: SummaryApi.update_suborder_status.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        suborderId: suborder?._id,
        status: status,
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
      <div className="mx-auto rounded-md bg-stone-600 p-4 w-full max-w-sm border-2 border-gray-300">
        <button onClick={onClose} className="text-lg ml-auto block">
          <FaRegWindowClose />
        </button>
        <h1 className="pb-4 text-lg font-medium text-center">Update Status</h1>
        <p className="text-start">
          <span>SUBORDER-ID : {suborder?._id}</span>
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p>Status :</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-600 outline-none border px-4 py-1 rounded-full"
          >
            {["Processing", "Shipped"].map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        {suborder?.status === status ? (
          <button
            onClick={updateStatus}
            className="bg-red-400 opacity-40 w-28 h-8 rounded-2xl shadow-sm shadow-white mx-auto block mt-2"
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

export default SuborderStatusUpdate;
