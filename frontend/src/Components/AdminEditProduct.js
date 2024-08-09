import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import DisplayFullImage from "./DisplayFullImage";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import { selectCategories } from "../Store/selector";
import { useSelector } from "react-redux";
import uploadMedia from "../helpers/uploadMedia";
import deleteMedia from "../helpers/deleteMedia";

const AdminEditProduct = ({ productData, onClose, fetchAllProducts }) => {
  const categories = useSelector(selectCategories);
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    _id: productData._id,
    name: productData.name,
    brand: productData.brand,
    description: productData.description,
    category: productData.category,
    subCategory: productData.subCategory,
    products: productData.products,
    discount: productData.discount,
    weight: productData.weight,
    price: {
      cost: productData.price.cost,
      mrp: productData.price.mrp,
      sell: productData.price.sell,
    },
    variants: productData.variants.map((variant, _) => ({
      color: variant.color,
      specs: variant.specs.map((spec, _) => ({
        size: spec.size,
        stock: spec.stock,
      })),
      images: variant.images,
    })),

    ratings: {
      average: productData.ratings.average,
      total: productData.ratings.total,
    },
    seller: {
      id: productData.seller.id,
      name: productData.seller.name,
      role: productData.seller.role,
    },
  });

  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const sell =
      product.price.mrp -
      parseInt((product.price.mrp * product.discount) / 100);
    const price = { ...product.price, [name]: value, sell: sell };
    setProduct({ ...product, price });
  };

  const handleVariantsChange = (variantIndex, e) => {
    const { name, value } = e.target;
    const variants = [...product.variants];
    variants[variantIndex] = { ...variants[variantIndex], [name]: value };
    setProduct({ ...product, variants });
  };

  const handleSpecsChange = (variantIndex, specIndex, e) => {
    const { name, value } = e.target;
    const variants = [...product.variants];
    variants[variantIndex].specs[specIndex] = {
      ...variants[variantIndex].specs[specIndex],
      [name]: value,
    };
    setProduct({ ...product, variants });
  };

  const handleImageUpload = async (variantIndex, e) => {
    const files = e.target.files;
    const variants = [...product.variants];
    for (let i = 0; i < files?.length; i++) {
      let uploadMediaCloudinary = await uploadMedia(files[i], "mega_mart");
      variants[variantIndex].images = [
        ...variants[variantIndex].images,
        uploadMediaCloudinary.url,
      ];
    }
    setProduct({ ...product, variants });
  };

  const handleImageDelete = async (variantIndex, imageIndex) => {
    const variants = [...product.variants];
    const newImages = [...variants[variantIndex].images];
    let deletedMediaUrl = newImages.splice(imageIndex, 1);
    deletedMediaUrl = deletedMediaUrl[0];
    variants[variantIndex].images = [...newImages];
    setProduct({ ...product, variants });
    
    // delete from cloudinary
    await deleteMedia(token, deletedMediaUrl);
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { color: "", specs: [{ size: "", stock: "" }], images: [] },
      ],
    });
  };

  const addSpec = (variantIndex) => {
    const variants = [...product.variants];
    variants[variantIndex].specs.push({ size: "", stock: "" });
    setProduct({ ...product, variants });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let dataResponse = await fetch(SummaryApi.update_product.url, {
      method: SummaryApi.update_product.method,
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
        Authorization: `${token}`,
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
          <form onSubmit={handleFormSubmit} className="mt-2 mx-4 xl:mx-24">
            <button
              onClick={onClose}
              className="-mt-4 -mr-4 xl:-mr-24 ml-auto block outline-none"
            >
              <FaWindowClose className="text-2xl " />
            </button>
            <div className="p-2 rounded-full flex items-center justify-between">
              <span className="text-xl font-bold">Edit product</span>
            </div>

            <div className="h-[calc(100vh-140px)] overflow-auto no-scrollbar">
              <div className="flex flex-wrap md:flex-nowrap justify-around xl:justify-center gap-4">
                <div className="w-full flex flex-col p-4 bg-custom rounded-lg">
                  <label className="text-lg">General information</label>

                  <div className="w-full md:flex justify-between gap-2 md:gap-4">
                    <div className="w-full max-w-2xl flex flex-col">
                      <label htmlFor="name" className="mt-2">
                        Product Name :
                      </label>
                      <input
                        value={product.name}
                        onChange={handleProductChange}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter product name..."
                        className="min-w-md outline-none h-10 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>

                    <div className="w-full max-w-2xl mb-4 flex flex-col">
                      <label htmlFor="brand" className="mt-2">
                        Brand Name :
                      </label>
                      <input
                        value={product.brand}
                        onChange={handleProductChange}
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Enter brand name..."
                        className="min-w-md outline-none h-10 pl-2 text-white bg-zinc-800 rounded-lg"
                      />
                    </div>
                  </div>

                  <label htmlFor="description">Product Description :</label>
                  <textarea
                    value={product.description}
                    onChange={handleProductChange}
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Describe about product..."
                    className="h-32 outline-none pl-2 text-white bg-zinc-800 rounded-lg"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-around gap-4 my-4 ">
                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                  <label htmlFor="Pricing and Stock" className="text-lg ">
                    Pricing and Stock
                  </label>
                  <div className="flex flex-wrap justify-around items-center gap-2">
                    <div className="flex flex-col w-full md:max-w-36 ">
                      <label htmlFor="cost" className="mt-2">
                        Cost Price :
                      </label>
                      <input
                        value={product.price.cost}
                        onChange={handlePriceChange}
                        type="number"
                        id="cost"
                        name="cost"
                        min={0}
                        placeholder="Eg: 2000"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36 ">
                      <label htmlFor="mrp" className="mt-2">
                        MRP :
                      </label>
                      <input
                        value={product.price.mrp}
                        onChange={handlePriceChange}
                        type="number"
                        id="mrp"
                        name="mrp"
                        min={0}
                        placeholder="Eg: 4000"
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
                        onChange={handleProductChange}
                        type="number"
                        id="discount"
                        name="discount"
                        min={0}
                        placeholder="Eg: 10"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
                      <label htmlFor="sell" className="mt-2">
                        Selling Price:
                      </label>
                      <input
                        value={
                          product.price.mrp -
                          parseInt((product.price.mrp * product.discount) / 100)
                        }
                        onChange={handlePriceChange}
                        type="number"
                        id="sell"
                        name="sell"
                        min={0}
                        placeholder="Eg: 3600"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full md:max-w-36">
                      <label htmlFor="weight" className="mt-2">
                        Weight (in gm):
                      </label>
                      <input
                        value={product.weight}
                        onChange={handleProductChange}
                        type="number"
                        id="weight"
                        name="weight"
                        min={0}
                        placeholder="Eg: 200"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                  <label htmlFor="ProductCategory" className="text-lg">
                    Categories
                  </label>
                  <div className="flex flex-wrap justify-around mt-2 gap-2">
                    <div className="flex flex-col w-full md:max-w-[160px]">
                      <label htmlFor="category">Choose Category</label>
                      <select
                        name="category"
                        id="category"
                        value={product.category}
                        onChange={handleProductChange}
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        required
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full md:max-w-[160px]">
                      <label htmlFor="subCategory">Choose Sub-category</label>
                      <select
                        name="subCategory"
                        id="subCategory"
                        value={product.subCategory}
                        onChange={handleProductChange}
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        disabled={!product.category}
                      >
                        <option value="" disabled>
                          Select sub-category
                        </option>
                        {categories.map(
                          (category, cindex) =>
                            category.name === product.category &&
                            category.subCategories.map(
                              (subCategory, sindex) => (
                                <option key={sindex} value={subCategory.name}>
                                  {subCategory.name}
                                </option>
                              )
                            )
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col w-full md:max-w-[160px]">
                      <label htmlFor="products">Choose Products</label>
                      <select
                        name="products"
                        id="products"
                        value={product.products}
                        onChange={handleProductChange}
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                        disabled={!product.subCategory}
                      >
                        <option value="">Select products</option>
                        {categories.map((category, _) =>
                          category.subCategories.map(
                            (subCategory, _) =>
                              subCategory.name === product.subCategory &&
                              subCategory.products.map((product, pindex) => (
                                <option key={pindex} value={product.name}>
                                  {product.name}
                                </option>
                              ))
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {product.variants.map((variant, variantIndex) => (
                <div className="flex flex-wrap md:flex-nowrap justify-around gap-4 my-4 ">
                  <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                    <label
                      htmlFor="Specifications of Variants"
                      className="text-lg font-bold"
                    >
                      Specifications of Variant {variantIndex+1}
                    </label>
                    {variant.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="flex flex-wrap justify-around items-center gap-2"
                      >
                        <div className="flex flex-col w-full md:max-w-36 ">
                          <label htmlFor="size" className="mt-2">
                            Size :
                          </label>
                          <input
                            value={spec.size}
                            onChange={(e) =>
                              handleSpecsChange(variantIndex, specIndex, e)
                            }
                            type="text"
                            id="size"
                            name="size"
                            placeholder="Eg: XL"
                            className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col w-full md:max-w-36">
                          <label htmlFor="stock" className="mt-2">
                            Stock :
                          </label>
                          <input
                            value={spec.stock}
                            onChange={(e) =>
                              handleSpecsChange(variantIndex, specIndex, e)
                            }
                            type="number"
                            id="stock"
                            name="stock"
                            min={0}
                            placeholder="Eg: 12"
                            className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                            required
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => addSpec(variantIndex)}
                      className="bg-green-500 mx-auto mt-8 w-36 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                    >
                      Add more specs
                    </button>
                    
                  </div>

                  <div
                    key={variantIndex}
                    className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg"
                  >
                    <label htmlFor="ProductImages" className="text-lg font-semibold">
                      Upload images of Variant {variantIndex+1}
                    </label>
                    <div className="flex flex-col w-full max-w-52 ">
                      <label htmlFor="color" className="mt-2">
                        Color :
                      </label>
                      <input
                        value={variant.color}
                        onChange={(e) => handleVariantsChange(variantIndex, e)}
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Eg: Glacial blue"
                        className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      />
                    </div>
                    <div className="w-full flex flex-col my-2">
                      <label
                        htmlFor={`image-upload-${variantIndex}`}
                        className="w-full max-w-2xl h-28 cursor-pointer text-center bg-zinc-800 rounded-md"
                      >
                        <FaCloudUploadAlt className="text-2xl mx-auto mt-6" />
                        <label htmlFor="UploadImage">Upload images</label>
                        <input
                          type="file"
                          name="images"
                          multiple="image/*"
                          id={`image-upload-${variantIndex}`}
                          className="hidden"
                          onChange={(e) => handleImageUpload(variantIndex, e)}
                        />
                      </label>

                      <div className="mt-5 flex gap-4">
                        {variant.images.map((image, imageIndex) => (
                          <label
                            htmlFor="images"
                            className="relative group w-16 h-16 bg-zinc-800 rounded-md cursor-pointer"
                          >
                            <img
                              key={imageIndex}
                              src={image}
                              alt={`var-${variantIndex}-img-${imageIndex}`}
                              id="images"
                              name="images"
                              className="w-full h-full object-contain rounded-md cursor-pointer"
                              onClick={() => {
                                setOpenFullImage(true);
                                setFullImage(image);
                              }}
                            />

                            <div
                              onClick={() =>
                                handleImageDelete(variantIndex, imageIndex)
                              }
                              className="hidden group-hover:block absolute -mt-3 -right-1 bg-red-500 rounded-full "
                            >
                              <MdDelete className="text-md p-0.5" />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={addVariant}
                      className="bg-green-500 mx-auto mt-2 w-40 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                    >
                      Add more Variant
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-center my-4">
                <button
                  type="submit"
                  className="bg-red-500 w-36 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
                >
                  Update
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
