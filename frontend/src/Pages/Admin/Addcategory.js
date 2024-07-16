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
        "authorization": `${token}`,
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
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="mx-auto rounded-md bg-custom shadow-md p-6 w-full max-w-md"
      >
        <div className="pb-4 text-xl font-medium">Add new categories</div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.category}
            name="category"
            id="category"
            placeholder="Enter category..."
            className="w-full outline-none h-8 pl-1 rounded-lg bg-zinc-800"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="subCategory">Sub-Category</label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.subCategory}
            name="subCategory"
            id="subCategory"
            placeholder="Enter subcategory..."
            className="w-full outline-none h-8 pl-1 rounded-lg bg-zinc-800"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="product">Product</label>
          <input
            onChange={handleChange}
            type="text"
            value={newCategory.product}
            name="product"
            id="product"
            placeholder="Enter product..."
            className="w-full outline-none h-8 pl-1 rounded-lg bg-zinc-800"
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