import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../Components/Loaders/Spinner";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import displayNepCurrency from "../../helpers/displayNepCurrency";
import moment from "moment";

const Coupons = () => {
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCoupons = useCallback(async () => {
    let response = await fetch(SummaryApi.get_customer_coupons.url, {
      method: SummaryApi.get_customer_coupons.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setCoupons(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <div className="m-2 md:p-2">
      <div className="w-full flex justify-between text-xl md:text-2xl font-semibold px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full select-none">
        <span>Coupons & Promocode</span>
      </div>

      <div className="">
        {loading ? (
          <Spinner />
        ) : coupons?.length === 0 ? (
          <div className="w-full text-lg xl:text-2xl p-2 font-semibold flex justify-center items-center text-center h-80 bg-stone-700 rounded-xl">
            No coupons available for now.
          </div>
        ) : (
          <div className="w-full flex gap-6">
            {coupons?.map((coupon) => (
            <div className="max-w-sm mx-auto bg-stone-700 shadow-lg rounded-lg border-2 border-zinc-500">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">
                  Save {coupon?.discount}% on {coupon?.applicableBrand}{" "}
                  {coupon?.applicableProducts}
                </h2>
                <p className="mb-4">
                  Get up to{" "}
                  <strong>{displayNepCurrency(coupon?.discountUpto)}</strong>{" "}
                  off on your order!
                </p>
                <p className="font-semibold rounded">Code : {coupon?.code}</p>
                <div className="text-sm mb-2">
                  <p>
                    Minimum Order :{" "}
                    {displayNepCurrency(coupon?.minimumOrderValue)}
                  </p>
                  <p className="text-sm">
                    Valid until : {moment(coupon?.validUntil).format("ll")}
                  </p>
                </div>
              </div>
              <div className="bg-stone-500 px-4 py-2">
                <p className="text-xs">
                  *Terms and conditions apply. Discounts applied on the minimum
                  order value.
                </p>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
