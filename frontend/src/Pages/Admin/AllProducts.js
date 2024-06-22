import React, { useEffect, useState } from 'react'
import SummaryApi from '../../Common';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const handleAllProducts = async () => {
    let productResponse = await fetch(SummaryApi.all_products.url, {
      method: SummaryApi.all_products.method,
    })

    productResponse = await productResponse.json();
    if (productResponse.success){
      setProducts(productResponse.data);
    }
  }

  useEffect(()=>{
    handleAllProducts();
  },[])

  return (
    <div className='p-4'>
      <div className="mb-4">
        <span className="text-xl font-bold">All Products</span>
      </div>
      <div>
        {
          products.map((product,index)=> (
            <h2>{product.name}</h2>
          ))
        }
      </div>
    </div>
  )
}

export default AllProducts;
