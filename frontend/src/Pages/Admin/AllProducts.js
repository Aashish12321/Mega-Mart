import React, { useEffect, useState } from 'react'
import SummaryApi from '../../Common';
import AdminProductCard from '../../Components/AdminProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const handleAllProducts = async () => {
    let productResponse = await fetch(SummaryApi.all_products.url, {
      method: SummaryApi.all_products.method,
    })

    productResponse = await productResponse.json();
    if (productResponse.success){
      console.log(productResponse.data);
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
      <div className='flex flex-wrap gap-6 h-[calc(100vh-250px)] overflow-auto'>
        {
          products.map((product,index)=> (
            <AdminProductCard product={product} fetchAllProducts={handleAllProducts}/>
          ))
        }
      </div>
    </div>
  )
}

export default AllProducts;
