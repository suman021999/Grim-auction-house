import React from 'react'
import logo from "../../../public/logo.png"

const Navbar = () => {
  return (
    <>
      <section className='border-2 border-gray-700 rounded-xl h-16 mt-10 flex items-center justify-between '>
      <div className='flex items-center px-6'>
        <img src={logo} className='h-16 w-16' alt="" />
        <span className='font-[font3] text-2xl text-customGreen1'>GRIM</span>
      </div>
      <div className='flex space-x-6 px-2'>
        <button className='bg-lightBg text-customGreen2 font-[font3] px-4 py-3 rounded-xl'>Sing Up</button>
      </div>
    </section>
    </>
  )
}

export default Navbar




