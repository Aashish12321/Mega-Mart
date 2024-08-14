import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const CreateCoupon = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [applicableNames, setApplicableNames] = useState({});

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    discountType: "percentage",
    validUntil: "",
    minimumOrderValue: 0,
    applicableBy: "",
    applicableProducts: "",
    applicableUsers: "",
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
      navigate(`/admin/all-products`);
    } else {
      toast.error(response.message);
    }
  };

  const getApplicableProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.get_products_properties.url, {
      method: SummaryApi.get_products_properties.method,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    response = await response.json();
    if (response.success) {
      setApplicableNames(response.data);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    getApplicableProducts();
  }, [getApplicableProducts]);

  return (
    <div className="w-full h-full flex items-center border-2 ">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col mx-auto gap-6 p-6 border-2 max-w-xl rounded-md bg-stone-500"
      >
        <div className="text-xl font-semibold">Create new coupon</div>

        <div className="flex flex-col">
          <label htmlFor="code" className="font-semibold">
            Coupon code *
          </label>
          <input
            onChange={handleChange}
            type="text"
            max={20}
            value={newCoupon?.code}
            name="code"
            id="code"
            placeholder="Eg: boAt500"
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
            required
          />
          <div className="text-sm text-end">Maximum 20 characters</div>
        </div>
        <div className="w-full flex gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="discount" className="font-semibold">
              Discount *
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={newCoupon?.discount}
              name="discount"
              id="discount"
              placeholder="Eg: 5"
              className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
              required
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
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="validUntil" className="font-semibold">
              Valid Until *
            </label>
            <input
              onChange={handleChange}
              type="date"
              value={newCoupon?.validUntil}
              name="validUntil"
              id="validUntil"
              className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="minimumOrderValue" className="font-semibold">
              Minimum Order Value *
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={newCoupon?.minimumOrderValue}
              min={0}
              name="minimumOrderValue"
              id="minimumOrderValue"
              placeholder="Eg: 2000"
              className="w-full outline-none no-spinner h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
              required
            />
          </div>
        </div>

        <div className="w-full flex gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="applicableBy" className="font-semibold">
              Applicable By *
            </label>
            <select
              name="applicableBy"
              id="applicableBy"
              value={newCoupon?.applicableBy}
              onChange={handleChange}
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400"
              required
            >
              <option value="" disabled>
                Select by
              </option>
              {["category", "subCategory", "products", "brand"].map(
                (type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="applicableProducts" className="font-semibold">
              {`Select ${newCoupon?.applicableBy}` || "Applicable for"} *
            </label>
            <select
              name="applicableProducts"
              id="applicableProducts"
              value={newCoupon?.applicableProducts}
              onChange={handleChange}
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400"
              required
            >
              {applicableNames[`${newCoupon?.applicableBy}`]?.map(
                (type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="applicableUsers" className="font-semibold">
            Applicable Users *
          </label>
          <select
            name="applicableUsers"
            id="applicableUsers"
            value={newCoupon?.applicableUsers}
            onChange={handleChange}
            className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400"
            required
          >
            <option value="" disabled>
              Select Users
            </option>
            {["new", "active", "inactive", "all"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all mx-auto block mt-5"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;
