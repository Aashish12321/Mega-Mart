import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductCategories from "../../helpers/productCategories";
import uploadImage from "../../helpers/uploadImage";
import DisplayFullImage from "../../Components/DisplayFullImage";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../Store/selector";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const user = useSelector(selectUser);
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: { cost: "", mrp: "", sell: "" },
    weight: "",
    discount: "",
    category: "",
    subCategory: "",
    productType: "",
    variants: [
      {
        color: "",
        specs: [{ size: "", stock: "" }],
        images: [],
      },
    ],
    ratings: {
      average: 0,
      total: 0,
    },
    seller: {
      id: user?._id,
      name: user?.name,
      role: user?.role,
    },
  });

  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);
  const navigate = useNavigate();
  const filteredSubcategories =
    ProductCategories.find((category) => category.name === product.category)
      ?.subcategories || [];

  // const handleProductChange = (e) => {
  //   const { name, value } = e.target;

  //   setProduct((previousData) => {
  //     const { markedPrice, discount } = previousData;
  //     const sellPrice = markedPrice - parseInt((markedPrice * discount) / 100);

  //     return {
  //       ...previousData,
  //       [name]: value,
  //       sellingPrice: sellPrice,
  //     };
  //   });
  // };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const { discount } = product;
    const { mrp } = product.price;
    const sellPrice = mrp - parseInt((mrp * discount) / 100);
    setProduct({
      ...product,
      price: { ...setProduct.price, [name]: value, sell: sellPrice },
    });
  };

  const handleVariantsChange = (variantIndex, e) => {
    const { name, value } = e.target;
    const variants = [...product.variants];
    variants[variantIndex] = { ...variants[variantIndex], [name]: value };
    setProduct({ ...product, variants });
  };

  const handleSpecsChange = (variantIndex, specsIndex, e) => {
    const { name, value } = e.target;
    const variants = [...product.variants];
    variants[variantIndex].specs[specsIndex] = {
      ...variants[variantIndex].specs[specsIndex],
      [name]: value,
    };
    setProduct({ ...product, variants });
  };

  const handleImageUpload = async (variantIndex, e) => {
    const images = e.target.files;
    const variants = [...product.variants];
    for (let i = 0; i < images.length; i++) {
      let uploadImageCloudinary = await uploadImage(images[i]);
      variants[variantIndex].images = [
        ...variants[variantIndex].images,
        uploadImageCloudinary.url,
      ];
      setProduct({ ...product, variants });
    }
  };

  const handleImageDelete = async (variantIndex, imageIndex) => {
    const variants = [...product.variants];
    const newImages = [...variants[variantIndex].images];
    newImages.splice(imageIndex, 1);
    variants[variantIndex].images = [...newImages];
    setProduct({ ...product, variants });
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
    variants[variantIndex].specs.push({ size: "", weight: "", stock: "" });
    setProduct({ ...product, variants });
  };

  // const handleImageUpload = async (e) => {
  //   const images = e.target.files;
  //   for (let i = 0; i < images.length; i++) {
  //     let uploadImageCloudinary = await uploadImage(images[i]);
  //     setProduct((previousData) => {
  //       return {
  //         ...previousData,
  //         images: [...previousData.images, uploadImageCloudinary.url],
  //       };
  //     });
  //   }
  // };

  // const handleImageDelete = async (index) => {
  //   const productNewImages = [...product.images];
  //   productNewImages.splice(index, 1); // Remove the item from index position.

  //   setProduct((previousData) => {
  //     return {
  //       ...previousData,
  //       images: [...productNewImages],
  //     };
  //   });
  // };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let dataResponse = await fetch(SummaryApi.upload_product.url, {
      method: SummaryApi.upload_product.method,
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });

    dataResponse = await dataResponse.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      navigate("/admin/all-products");
    } else {
      toast.error(dataResponse.message);
    }
  };
  return (
    <div className="">
      <div className="">
        <form onSubmit={handleFormSubmit} className="mt-2 mx-4">
          <div className="p-2 rounded-full flex items-center justify-between">
            <span className="text-xl font-bold">Add new product</span>
          </div>

          <div className="h-[calc(100vh-100px)] overflow-auto no-scrollbar">
            <div className="flex flex-wrap lg:flex-nowrap justify-around gap-4">
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
                  className="min-w-md h-32 outline-none pl-2 text-white bg-zinc-800 rounded-lg"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-around gap-4 my-4 ">
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
                      value={product.price.sell}
                      onChange={handleProductChange}
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
                      {filteredSubcategories.map((sub_category, index) => (
                        <option key={sub_category.id} value={sub_category.name}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:max-w-[160px]">
                    <label htmlFor="productType">Choose Product type</label>
                    <select
                      name="productType"
                      id="productType"
                      value={product.productType}
                      onChange={handleProductChange}
                      className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      disabled={!product.category}
                    >
                      {filteredSubcategories.map((sub_category, index) => (
                        <option key={sub_category.id} value={sub_category.name}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-around gap-4 my-4 ">
              <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                <label htmlFor="Specifications" className="text-lg ">
                  Specifications
                </label>
                <div className="flex flex-wrap justify-around items-center gap-2">
                  <div className="flex flex-col w-full md:max-w-36 ">
                    <label htmlFor="color" className="mt-2">
                      Color :
                    </label>
                    <input
                      value={product.costPrice}
                      onChange={handleProductChange}
                      type="text"
                      id="color"
                      name="color"
                      min={0}
                      placeholder="Eg: Glacial blue"
                      className="outline-none h-8 pl-2 text-white bg-zinc-800 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full md:max-w-36 ">
                    <label htmlFor="size" className="mt-2">
                      Size :
                    </label>
                    <input
                      value={product.markedPrice}
                      onChange={handleProductChange}
                      type="text"
                      id="size"
                      name="size"
                      min={0}
                      placeholder="Eg: XL"
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
                      onChange={handleProductChange}
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
              </div>

              <div className="w-full max-w-2xl flex flex-col p-4 bg-custom rounded-lg">
                <label htmlFor="ProductImages" className="text-lg">
                  Upload product images
                </label>

                <div className="w-full flex flex-col my-2">
                  <label
                    htmlFor="uploadProductImage"
                    className="w-full max-w-2xl h-28 cursor-pointer text-center bg-zinc-800 rounded-md"
                  >
                    <FaCloudUploadAlt className="text-2xl mx-auto mt-6" />
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
                    {product.variants.map((variant, variantIndex) =>
                      variant.images.map((image, index) => (
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
                            onClick={() => handleImageDelete(index)}
                            className="hidden group-hover:block absolute -mt-3 -right-1 bg-red-500 rounded-full "
                          >
                            <MdDelete className="text-md p-0.5" />
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center my-4">
              <button
                type="submit"
                className="bg-red-500 w-32 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
              >
                Add Product
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
  );
};

export default AddProduct;
