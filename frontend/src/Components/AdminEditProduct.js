import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import ProductCategories from "../helpers/productCategories";
import uploadImage from "../helpers/uploadImage";
import DisplayFullImage from "./DisplayFullImage";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ productData, onClose, fetchAllProducts }) => {
  const [product, setProduct] = useState({
    _id: productData._id,
    name: productData.name,
    brand: productData.brand,
    category: productData.category,
    subCategory: productData.subCategory,
    images: productData.images,
    description: productData.description,
    costPrice: productData.costPrice,
    markedPrice: productData.markedPrice,
    stock: productData.stock,
    discount: productData.discount,
    discountType: productData.discountType,
    sellingPrice: productData.sellingPrice,
  });

  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);
  const filteredSubcategories =
    ProductCategories.find((category) => category.name === product.category)
      ?.subcategories || [];

  const handleProductData = (e) => {
    const { name, value } = e.target;

    setProduct((previousData) => {
      const { markedPrice, discount } = previousData;
      const sellPrice = markedPrice - parseInt((markedPrice * discount) / 100);

      return {
        ...previousData,
        [name]: value,
        sellingPrice: sellPrice,
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    let uploadImageCloudinary = await uploadImage(file);

    setProduct((previousData) => {
      return {
        ...previousData,
        images: [...previousData.images, uploadImageCloudinary.url],
      };
    });
    console.log("Upload image: ", uploadImageCloudinary.url);
  };

  const handleDeleteImage = async (index) => {
    const productNewImages = [...product.images];
    productNewImages.splice(index, 1); // Remove the item from index position.

    setProduct((previousData) => {
      return {
        ...previousData,
        images: [...productNewImages],
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    let dataResponse = await fetch(SummaryApi.update_product.url, {
      method: SummaryApi.update_product.method,
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });

    dataResponse = await dataResponse.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      fetchAllProducts();
      onClose();
    } else {
      toast.error(dataResponse.message);
    }
  };
  return (
    <div className="fixed top-16 left-0 bottom-0 right-0 z-10 bg-slate-300 bg-opacity-50 items-center">
      <div className="w-full bg-customCard">
        <div className="py-2 my-0.5">
          <form onSubmit={handleFormSubmit} className="mt-2 mx-4">
            <button
              onClick={onClose}
              className="-mt-4 -mr-4 ml-auto block outline-none"
            >
              <FaWindowClose className="text-2xl " />
            </button>
            <div className="p-2 rounded-full flex items-center justify-between">
              <span className="text-xl font-bold">Edit product</span>
            </div>

            <div className="h-[calc(100vh-140px)] overflow-auto">
              <div className="flex flex-wrap md:flex-nowrap justify-around xl:justify-center gap-4">
                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
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
                    className="min-w-md outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                    required
                  />

                  <label htmlFor="description" className="mt-2">
                    Product Description :
                  </label>
                  <textarea
                    value={product.description}
                    onChange={handleProductData}
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Describe about product..."
                    className="min-w-md h-20 outline-none pl-2 text-white bg-zinc-800 rounded-lg"
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
                    className="min-w-md outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                  />
                </div>

                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                  <label htmlFor="ProductImages" className="text-lg">
                    Upload product images
                  </label>

                  <div className="flex flex-col h-full my-2 justify-between">
                    <label
                      htmlFor="uploadProductImage"
                      className="w-full max-w-2xl h-36 cursor-pointer text-center bg-zinc-800 rounded-md"
                    >
                      <FaCloudUploadAlt className="text-2xl mx-auto mt-10" />
                      <label htmlFor="UploadImage">Upload image</label>
                      <input
                        type="file"
                        name="image"
                        multiple="image/*"
                        id="uploadProductImage"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>

                    <div className="mt-5 flex gap-4">
                      {product.images.map((image, index) => {
                        return (
                          <label
                            htmlFor="images"
                            className="relative group w-16 h-16 bg-zinc-800 rounded-md cursor-pointer"
                          >
                            <img
                              src={image}
                              alt="photos"
                              id="images"
                              name="images"
                              className="w-full h-full object-contain rounded-md cursor-pointer"
                              onClick={() => {
                                setOpenFullImage(true);
                                setFullImage(image);
                              }}
                            />

                            <div
                              onClick={() => handleDeleteImage(index)}
                              className="hidden group-hover:block absolute -mt-3 -right-1 bg-red-500 rounded-full "
                            >
                              <MdDelete className="text-md p-0.5" />
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-around xl:justify-center gap-4 my-4 ">
                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                  <label htmlFor="Pricing and Stock" className="text-lg ">
                    Pricing and Stock
                  </label>
                  <div className="flex flex-wrap justify-around items-center gap-2 xl:gap-6">
                    <div className="flex flex-col w-full md:max-w-36 ">
                      <label htmlFor="costPrice" className="mt-2">
                        Cost Price :
                      </label>
                      <input
                        value={product.costPrice}
                        onChange={handleProductData}
                        type="number"
                        id="costPrice"
                        name="costPrice"
                        min={0}
                        placeholder="Eg: 2599"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36 ">
                      <label htmlFor="markedPrice" className="mt-2">
                        Marked Price :
                      </label>
                      <input
                        value={product.markedPrice}
                        onChange={handleProductData}
                        type="number"
                        id="markedPrice"
                        name="markedPrice"
                        min={0}
                        placeholder="Eg: 3999"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
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
                        placeholder="Eg: 12"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
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
                        placeholder="Eg: 15"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
                      <label htmlFor="discountType" className="mt-2">
                        Discount Type :
                      </label>
                      <input
                        value={product.discountType}
                        onChange={handleProductData}
                        type="text"
                        id="discountType"
                        name="discountType"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        disabled={!product.discount}
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
                      <label htmlFor="sellingPrice" className="mt-2">
                        Selling Price:
                      </label>
                      <input
                        value={product.sellingPrice}
                        onChange={handleProductData}
                        type="number"
                        id="sellingPrice"
                        name="sellingPrice"
                        min={0}
                        placeholder="Eg: 3399"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                  <label htmlFor="ProductCategory" className="text-lg">
                    Categories
                  </label>
                  <div className="flex flex-wrap justify-around mt-2 gap-2">
                    <div className="flex flex-col w-full md:max-w-60">
                      <label htmlFor="category">Choose Category</label>
                      <select
                        name="category"
                        id="category"
                        value={product.category}
                        onChange={handleProductData}
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      >
                        <option value="" selected disabled>
                          Select a category
                        </option>
                        {ProductCategories.map((category, index) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full md:max-w-60">
                      <label htmlFor="subCategory">Choose Sub-category</label>
                      <select
                        name="subCategory"
                        id="subCategory"
                        value={product.subCategory}
                        onChange={handleProductData}
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        disabled={!product.category}
                      >
                        {filteredSubcategories.map((sub_category, index) => (
                          <option
                            key={sub_category.id}
                            value={sub_category.name}
                          >
                            {sub_category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center my-4">
                <button
                  type="submit"
                  className="bg-red-500 w-36 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                >
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </div>
        {openFullImage && (
          <DisplayFullImage
            imgUrl={fullImage}
            onClose={() => setOpenFullImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
