import React from 'react'
import Navbar from '../Navigation/Navbar'
import { data1 } from '../../../data/data'

const Banner = () => {
  return (
    <>
    <section className='w-full bg-[#a5f06863] py-8'>
      <div className='container mx-auto px-20 mb-8'>
        <Navbar/>
        <div className='flex flex-col md:flex-row mt-12 md:mt-20 w-full '>
          <div className='right md:w-1/2 mb-8 md:mb-0 md:pr-8  lg:mx-8'>
            <h1 className='font-[font3] text-6xl md:text-6xl leading-tight'>Bid Beyond Limits. Own What Others Only Dream Of.</h1>
            <h4 className='font-[font3]  text-4xl md:text-4xl my-4'>Bid, Win, and Own the Extraordinary.</h4>
            <p className='font-[font3]  md:text-2xl'>Founded with a vision to redefine auctions, Grim brings together collectors, dreamers, and investors from around the world.</p>
            {/* <button className='mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors'>
              Explore Auctions
            </button> */}
          </div>

          <div className='left lg:mx-8 md:w-1/2 h-[100vh] lg:mt-10 border-2 rounded-xl flex items-center justify-center overflow-hidden'>
           <div className=''>
       {data1.map((item) => (
       

        <img
              key={item.id}
              src={item.img}
              alt={`item-${item.id}`}
              className="w-40 h-40 object-cover rounded-lg m-2"
            />

           
       
            
            
          ))}

          
</div>

          </div>

        </div>
      </div>

    </section>
    </>
  )
}

export default Banner

