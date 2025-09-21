import React from 'react'
import { company } from '../../../data/data'  

const Trust = () => {
  return (
    <section
      className="rounded-3xl p-8 shadow-lg"
      style={{ backgroundColor: "white" }}
    >
      <h2 className="text-customGreen3 text-2xl font-[font3]">
        Trusted by <span className='font-[font1]'>500+</span> Businesses
      </h2>

      <p className="text-customGreen5 mt-2 w-full lg:w-1/2 font-[font3]">
        Discover the world’s largest and most trusted bidding marketplace — where beautiful products meet endless opportunities. We’re here to be part of your smile, your success, and your future growth.
      </p>

      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {company.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center "
          >
            <img
              src={`/coLogos/${item.logo}.png`}
              alt={item.logo}
              className="w-44 h-20 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Trust



