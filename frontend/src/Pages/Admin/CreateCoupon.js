import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [applicable, setApplicable] = useState([]);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    discountUpto: 0,
    validUntil: "",
    minimumOrderValue: 0,
    applicableProducts: "",
    applicableBrand: "",
    applicableProductId: "",
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
      setApplicable(response.data);
    } else {
      toast.error(response.message);
    }
  }, [token]);

  useEffect(() => {
    getApplicableProducts();
  }, [getApplicableProducts]);

  return (
    <div className="m-1 p-1 md:m-2 md:p-2 rounded-lg">
      <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
        <span className="text-xl font-bold">Create new coupon</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col mx-auto gap-6 p-4 border-2 border-zinc-400 rounded-xl bg-stone-500"
      >
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
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
            required
          />
          <div className="text-sm text-end">Maximum 20 characters</div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="discount" className="font-semibold">
              Discount (in %) *
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={newCoupon?.discount}
              name="discount"
              id="discount"
              placeholder="Eg: 5"
              className="w-full outline-none no-spinner h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="discountUpto" className="font-semibold">
              Discount Upto (in NPR) *
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={newCoupon?.discountUpto}
              name="discountUpto"
              id="discountUpto"
              placeholder="Eg: 500"
              className="w-full outline-none no-spinner h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
              required
            />
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
              className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
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
              className="w-full outline-none no-spinner h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="applicableProducts" className="font-semibold">
              Applicable Products *
            </label>
            <select
              name="applicableProducts"
              id="applicableProducts"
              value={newCoupon?.applicableProducts}
              onChange={handleChange}
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400 rounded-lg"
              required
            >
              {applicable?.map((productsWithBrands, index) => (
                <option key={index} value={productsWithBrands["products"]}>
                  {productsWithBrands["products"]}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="applicableBrand" className="font-semibold">
              Applicable Brand *
            </label>
            <select
              name="applicableBrand"
              id="applicableBrand"
              value={newCoupon?.applicableBrand}
              onChange={handleChange}
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400 rounded-lg"
              required
            >
              <option value="" disabled>
                Select
              </option>
              {applicable?.map(
                (productsWithBrands, index) =>
                  productsWithBrands["products"] ===
                    newCoupon?.applicableProducts &&
                  productsWithBrands["brands"]?.map((brand) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))
              )}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          <div className="w-full flex flex-col">
            <label htmlFor="applicableProductId" className="font-semibold">
              Applicable Product Id
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={newCoupon?.applicableProductId}
              name="applicableProductId"
              id="applicableProductId"
              placeholder="Eg: kjyrhr23rwhewrkjfkshf83"
              className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400 rounded-lg"
            />
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
              className="outline-none w-full h-8 text-white bg-zinc-800 border-2 border-zinc-400 rounded-lg"
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
