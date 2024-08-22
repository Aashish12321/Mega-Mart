import React, { useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";

const Addcategory = () => {
  const token = localStorage.getItem("token");
  const [newCategory, setNewCategory] = useState({
    category: "",
    subCategory: "",
    product: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(SummaryApi.add_categories.url, {
      method: SummaryApi.add_categories.method,
      body: JSON.stringify(newCategory),
      headers: {
        "content-type": "application/json",
        Authorization: `${token}`,
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
    <div className="m-1 p-1 md:m-2 md:p-2 rounded-lg">
      <div className="px-2 py-1 mb-4 border-2 border-zinc-400 bg-stone-500 rounded-full">
        <span className="text-xl font-bold">Add new category</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto rounded-lg border-2 border-zinc-400 bg-stone-500 shadow-md p-6 w-full max-w-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.category}
            name="category"
            id="category"
            placeholder="Enter category..."
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="subCategory" className="font-semibold">
            Sub-Category
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.subCategory}
            name="subCategory"
            id="subCategory"
            placeholder="Enter subcategory..."
            className="w-full outline-none h-8 p-2 bg-zinc-800 border-2 border-zinc-400"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="product" className="font-semibold">
            Product
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.product}
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

export default Addcategory;
