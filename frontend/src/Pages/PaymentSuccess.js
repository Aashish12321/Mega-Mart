import React from "react";
import paymentSuccess from "../Assets/payment_success.gif";

const PaymentSuccess = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <img
          src={paymentSuccess}
          alt="paymentSuccess.gif"
          className="w-1/3 rounded-b-xl shadow-custom"
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
