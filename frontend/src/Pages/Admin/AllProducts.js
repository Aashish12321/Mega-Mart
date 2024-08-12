import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common";
import AdminProductCard from "../../Components/AdminProductCard";
import VPLoader from "../../Components/Loaders/VPLoader";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleAllProducts = async () => {
    let productResponse = await fetch(SummaryApi.all_products.url, {
      method: SummaryApi.all_products.method,
    });

    productResponse = await productResponse.json();
    if (productResponse.success) {
      setLoader(false);
      setProducts(productResponse.data);
    }
  };

  useEffect(() => {
    handleAllProducts();
  }, []);

  return (
    <div className="px-1 py-2 md:py-4">
      <div className="mb-1 md:mb-4">
        <span className="text-xl pl-2 font-bold">All Products</span>
      </div>

      {loader ? (
        <VPLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 lg:p-4 gap-4 xl:gap-8 h-[calc(100vh-100px)] overflow-auto no-scrollbar">
          {products.map((product, index) =>
            product.variants.map((variant, variantIndex) => (
              <AdminProductCard
                product={product}
                variant={variant}
                variantIndex={variantIndex}
                fetchAllProducts={handleAllProducts}
                key={product._id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
