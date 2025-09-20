import React from 'react'
import logo from "../../../public/logo.png"

const Navbar = () => {
  return (
    <>
      <section className='border-2 border-gray-700 rounded-xl h-16 mt-10 flex items-center justify-between px-6'>
      <div className='flex items-center '>
        <img src={logo} className='h-16 w-16' alt="" />
        <span className='font-[font3] text-2xl'>GRIM</span>
      </div>
      <div className='flex space-x-6'>
        
      </div>
    </section>
    </>
  )
}

export default Navbar




