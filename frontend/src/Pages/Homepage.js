import React from 'react'
import Banner from '../Components/Banner';
import CategorywiseProducts from '../Components/CategorywiseProducts';
const Homepage = () => {
  return (
    <div className='w-full  text-white overflow-auto no-scrollbar'>
      <div className='w-full'>

        <Banner />
      </div>

      <div className='mt-2 md:mx-6'>
        <CategorywiseProducts category={"Smartwatch"} heading={"Best Selling Smartwatches"}/>
      </div>
      
      <div className='md:mx-6'>
        <CategorywiseProducts category={"Earbuds & Airpods"} heading={"Top Earbuds and Airpods"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Smartphones"} heading={"Best Selling Smartphones"}/>
      </div>
      
      <div className='md:mx-6'>
        <CategorywiseProducts category={"Refrigerators"} heading={"Refrigerators"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Speakers"} heading={"Cool Speakers"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Television"} heading={"Televisions"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Trimmers"} heading={"Men's Grooming and Trimmers"}/>
      </div>

    </div>
  )
}

export default Homepage;
