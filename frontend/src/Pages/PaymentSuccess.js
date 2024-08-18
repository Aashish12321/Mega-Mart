import React from "react";
import paymentSuccess from "../Assets/bg-success.gif";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="w-full flex justify-center items-center p-4 text-white">
      <div className="flex flex-col items-center p-4 gap-1 shadow-lg shadow-stone-300 rounded-lg bg-stone-700">
        <img
          src={paymentSuccess}
          alt="paymentSuccess.gif"
          className="w-1/2 md:w-1/3"
        />
        <div className="flex flex-col gap-4 items-center">
          <span className="text-lg md:text-2xl font-Roboto font-semibold">
            Payment Successful
          </span>
          <span className="text-md md:text-lg font-Roboto font-semibold">
            Your order has been created.
          </span>
          <Link to={"/profile/view-order"} className="w-full max-w-36 p-1 text-center rounded-full bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all">
            Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
