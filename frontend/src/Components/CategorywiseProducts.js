import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../Common";

const CategorywiseProducts = ({ category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    let response = await fetch(SummaryApi.get_catgwiseproducts.url, {
      method: SummaryApi.get_catgwiseproducts.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({category: category}),
    });

    response = await response.json();
    if (response.success) {
      setLoading(false);
      setProducts(response.data);
      console.log(products);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="ml-4 mt-4 text-xl font-semibold">{heading}</div>
      <div>
        {
          products.map((product, index)=> {

          })
        }
      </div>
    </div>
  );
};

export default CategorywiseProducts;
