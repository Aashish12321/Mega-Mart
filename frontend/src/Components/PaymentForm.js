import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SummaryApi from "../Common";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/selector";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentForm = ({ total }) => {
  const user = useSelector(selectUser);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const CardElement = elements.getElement(CardNumberElement);

    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: CardElement,
    });

    if (paymentMethod.error) {
      toast.error(paymentMethod?.error?.message);
    } else {
      let response = await fetch(SummaryApi.create_payment_intent.url, {
        method: SummaryApi.create_payment_intent.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ total: total }),
      });

      response = await response.json();

      const confirmPayment = await stripe.confirmCardPayment(
        response?.data?.clientSecret,
        {
          payment_method: {
            card: CardElement,
            billing_details: {
              name: user?.name,
            },
          },
        }
      );
      setTransactionId(response?.data?.transactionId);

      if (confirmPayment.error) {
        toast.error(confirmPayment.error.message);
      } else {
        toast.success("Payment Success");
        navigate("/checkout/payment-success");
        // Handle post-payment success (e.g., update the database, show a success message)
      }
    }
  };

  return (
    <div className="w-full text-white">
      <span className="flex p-2 gap-4 items-center text-xl font-semibold border-b-2 border-zinc-500">
        <FaCreditCard /> Debit/Credit Card
      </span>
      <div className="flex flex-col w-full my-2 p-1">
        <span className="text-md font-semibold">Enter Card Number *</span>
        <CardNumberElement className="w-full p-2 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800" />
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6 my-4 p-1">
        <div className="w-full flex flex-col">
          <span className="text-md font-semibold">Expiry Date *</span>
          <CardExpiryElement className="w-full p-2 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800" />
        </div>
        <div className="w-full flex flex-col">
          <span className="text-md font-semibold">CVC *</span>
          <CardCvcElement className="w-full text-white p-2 outline-none no-spinner border-2 border-zinc-500 bg-zinc-800" />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!stripe}
          className="w-full max-w-36 p-1 text-center rounded-full bg-green-500 shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
        >
          Make payment
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
