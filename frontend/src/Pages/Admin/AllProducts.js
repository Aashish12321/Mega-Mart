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
      setProducts(productResponse.data);
    }
  }

  useEffect(()=>{
    handleAllProducts();
  },[])

  return (
    <div className='px-1 py-2 md:py-4'>
      <div className="mb-1 md:mb-4">
        <span className="text-xl pl-2 font-bold">All Products</span>
      </div>
      <div  className='justify-center flex flex-wrap gap-4 py-2 h-[calc(100vh-100px)] overflow-auto no-scrollbar'>
        {
          products.map((product,index)=> (
            <AdminProductCard product={product} fetchAllProducts={handleAllProducts} key={product._id}/>
          ))
        }
      </div>
    </div>
  )
}

export default AllProducts;
