import React from 'react'
import Banner from '../Components/Banner';
import CategorywiseProducts from '../Components/CategorywiseProducts';
const Homepage = () => {
  
  return (
    <div className='w-full -mt-1 text-white'>
      <div className='w-full '>
        <Banner />
      </div>
      
      <div>
        <CategorywiseProducts category={"Earbuds & Airpods"} heading={"Top Earbuds and Airpods"}/>
      </div>
    </div>
  )
}

export default Homepage;
