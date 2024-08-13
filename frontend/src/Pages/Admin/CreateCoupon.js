import React, { useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";

const CreateCoupon = () => {
  const token = localStorage.getItem("token");

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    discountType: "percentage",
    validUntil: "",
    minimumOrderValue: 0,
    applicableProducts: [],
    createdBy: "platform", // or 'vendor' depending on who is creating it
    vendorId: "", // fill this only if createdBy is 'vendor'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(SummaryApi.create_coupon.url, {
      method: SummaryApi.create_coupon.method,
      body: JSON.stringify(newCoupon),
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json(response);
    if (response.success) {
      toast.success(response.message);
      console.log(response.data);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full m-2 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 p-6 border-2 max-w-lg rounded-md bg-stone-500"
      >
        <div className="pb-4 text-xl font-semibold">Add new coupon</div>
        <div className="flex flex-col">
          <label htmlFor="code" className="font-semibold">
            Coupon code *
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={newCoupon?.code}
            name="code"
            id="code"
            placeholder="Enter code..."
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
            required
          />
        </div>
        <div className="w-full flex gap-4 justify-between mt-2">
          <div className="w-full flex flex-col">
            <label htmlFor="discount" className="font-semibold">
              Discount
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={newCoupon?.discount}
              name="discount"
              id="discount"
              placeholder="Enter subcategory..."
              className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="discountType" className="font-semibold">
              Discount type *
            </label>
            <select
              name="discountType"
              id="discountType"
              value={newCoupon.discountType}
              onChange={handleChange}
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400"
              required
            >
              {["percentage", "fixed"].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col mt-2">
          <label htmlFor="product" className="font-semibold">
            Product
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={newCoupon.product}
            name="product"
            id="product"
            placeholder="Enter product..."
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all mx-auto block mt-5"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;
