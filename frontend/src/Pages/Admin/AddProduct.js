import React, { useState } from "react";
import ProductCategories from "../../helpers/productCategories";
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    description: "",
    price: "",
    discount: "",
    sellingPrice: "",
  });
  const handleProductData = (e) => {
    const { name, value } = e.target;
    setProduct((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {};
  return (
    <div>
      <div className="p-2 m-1 border-2 border-red-500">
        <form onSubmit={handleSubmit}>
          <div className=" mb-4 flex items-center justify-between">
            <span className="text-xl font-bold">Add new product</span>
            <button
              type="submit"
              className="bg-red-500 w-28 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Add Product
            </button>
          </div>

          <div className="flex justify-between">
            <div className="w-full max-w-2xl flex flex-col p-2 bg-custom rounded-lg">
              <label className="text-lg">General information</label>

              <label htmlFor="name" className="mt-2">
                Product Name :
              </label>
              <input
                value={product.name}
                onChange={handleProductData}
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name..."
                className="max-w-xl outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                required
              />

              <label htmlFor="description" className="mt-2">Product Description :</label>
              <textarea
                value={product.description}
                onChange={handleProductData}
                type="text"
                id="description"
                name="description"
                placeholder="Describe the product..."
                className="max-w-xl h-20 outline-none pl-2 text-white bg-zinc-800 rounded-lg"
                required
              ></textarea>

              <label htmlFor="brand" className="mt-2">
                Brand Name :
              </label>
              <input
                value={product.brand}
                onChange={handleProductData}
                type="text"
                id="brand"
                name="brand"
                placeholder="Enter brand name..."
                className="max-w-xl outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
              />

            </div>

            <div className="w-full  max-w-lg flex flex-col p-2 rounded-lg bg-custom">
              <label htmlFor="image" className="text-lg">Upload Image</label>
            </div>
          </div>

          <div className="flex  justify-between">
            <div className="w-full max-w-2xl mt-4 flex flex-col p-4 bg-custom rounded-lg">
              <label className="text-lg">Pricing and Stock</label>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <label htmlFor="price" className="mt-2">
                    Price :
                  </label>
                  <input
                    value={product.price}
                    onChange={handleProductData}
                    type="number"
                    id="price"
                    name="price"
                    min={0}
                    placeholder="0"
                    className="w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="stock" className="mt-2">
                    Stock :
                  </label>
                  <input
                    value={product.stock}
                    onChange={handleProductData}
                    type="number"
                    id="stock"
                    name="stock"
                    min={0}
                    placeholder="0"
                    className="w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <label htmlFor="discount" className="mt-2">
                    Discount (in %):
                  </label>
                  <input
                    value={product.discount}
                    onChange={handleProductData}
                    type="number"
                    id="discount"
                    name="discount"
                    min={0}
                    placeholder="0 %"
                    className="w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="discountType" className="mt-2">
                    Discount Type :
                  </label>
                  <input
                    value={product.discountType}
                    onChange={handleProductData}
                    type="text"
                    id="discountType"
                    name="discountType"
                    placeholder="Enter discount type"
                    className="w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="w-full p-2 mt-4 max-w-lg flex flex-col rounded-lg bg-custom">
              <label htmlFor="category" className="text-lg p-2">Category</label>

              <label>Product Category</label>
              <select name="category" id="category" className=" w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg">
                {
                  ProductCategories.map((category, index)=>{
                    return(
                      <option value={category.name} id={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
