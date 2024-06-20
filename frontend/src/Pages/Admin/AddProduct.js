import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProductCategories from "../../helpers/productCategories";
import uploadImage from "../../helpers/uploadImage";
import DisplayFullImage from "./DisplayFullImage";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    images: [],
    description: "",
    price: "",
    discount: "",
    sellingPrice: "",
  });

  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);

  const handleProductData = (e) => {
    const { name, value } = e.target;
    setProduct((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    let uploadImageCloudinary = await uploadImage(file);
    // uploadImageCloudinary = uploadImageCloudinary.url;

    setProduct((previousData) => {
      return {
        ...previousData,
        images: [...previousData.images, uploadImageCloudinary.url],
      };
    });
    console.log("Upload image: ", uploadImageCloudinary.url);
  };

  const handleSubmit = () => {};
  return (
    <div>
      <div className="p-2 m-1">
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

          <div className="flex justify-around">
            <div className="w-full max-w-2xl flex flex-col px-4 py-2  bg-custom rounded-lg">
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

              <label htmlFor="description" className="mt-2">
                Product Description :
              </label>
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

            <div className="w-full max-w-lg flex flex-col px-1 py-2 rounded-lg bg-custom">
              <label htmlFor="images" className="text-lg">
                Upload product images
              </label>
              <div className="flex h-full my-2 justify-around">
                {product.images[0]? (
                  <img
                    src={product.images[0]}
                    alt="photos"
                    id="images"
                    className="w-56 rounded-md cursor-pointer"
                    onClick={()=>{
                      setOpenFullImage(true);
                      setFullImage(product.images[0]);
                    }}
                  />
                ) : 
                (
                  <label
                    htmlFor="image0"
                    className="w-full h-full max-w-xs cursor-pointer text-center bg-zinc-800 rounded-md"
                  >
                    <FaCloudUploadAlt className="text-2xl mx-auto mt-20" />
                    <label htmlFor="uploadProductImage">Upload image</label>
                    <input
                      type="file"
                      name="image"
                      id="image0"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )
                }

                <div className="flex flex-col gap-4">
                  {product.images[1] ? (
                    <img
                      src={product.images[1]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        // setOpenFullImage(true);
                        setFullImage(product.images[1]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image1"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image1"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {product.images[2] ? (
                    <img
                      src={product.images[2]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        setOpenFullImage(true);
                        setFullImage(product.images[2]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image2"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image2"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {product.images[3] ? (
                    <img
                      src={product.images[3]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        setOpenFullImage(true);
                        setFullImage(product.images[3]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image3"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image3"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {product.images[4] ? (
                    <img
                      src={product.images[4]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        setOpenFullImage(true);
                        setFullImage(product.images[4]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image1"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image4"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {product.images[5] ? (
                    <img
                      src={product.images[5]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        setOpenFullImage(true);
                        setFullImage(product.images[5]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image5"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image5"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {product.images[6] ? (
                    <img
                      src={product.images[6]}
                      alt="photos"
                      id="images"
                      className="w-16 rounded-md cursor-pointer"
                      onClick={()=>{
                        setOpenFullImage(true);
                        setFullImage(product.images[6]);
                      }}
                    />
                  ) : (
                    <label
                      htmlFor="image6"
                      className="w-20 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <FaCloudUploadAlt className="text-xl mt-5 mx-auto" />
                      <input
                        type="file"
                        name="image"
                        id="image6"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex  justify-around">
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

            <div className="w-full px-4 py-2 mt-4 max-w-lg flex flex-col rounded-lg bg-custom">
              <label htmlFor="ProductCategory" className="text-lg py-2">
                Category
              </label>

              <label htmlFor="category">Product Category</label>
              <select
                name="category"
                id="category"
                className="w-64 outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
              >
                {ProductCategories.map((category, index) => {
                  return (
                    <option value={category.name} id={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
      {
        openFullImage &&
          <DisplayFullImage imgUrl={fullImage} onClose={()=> setOpenFullImage(false)} /> 

      }   
    </div>
  );
};

export default AddProduct;
