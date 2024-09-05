import React from 'react'
import Banner from '../Components/Banner';
import CategorywiseProducts from '../Components/CategorywiseProducts';

const Homepage = () => {
  return (
    <div className='w-full text-white'>
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
        <CategorywiseProducts category={"Refrigerators"} heading={"Premium Refrigerators for Modern Kitchens"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Speakers"} heading={"Cool Speakers"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Television"} heading={"Best Televisions for Every Space"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Headphones"} heading={"Premium Headphones for You"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Trimmers"} heading={"Men's Grooming and Trimmers"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Camera"} heading={"Top-Notch Cameras for Every Photographer"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Neckband Earphones"} heading={"Comfortable and Reliable Neckband Earphones"}/>
      </div>

      <div className='md:mx-6'>
        <CategorywiseProducts category={"Mouse"} heading={"Find Your Perfect Mouse"}/>
      </div>

    </div>
  )
}

export default Homepage;
