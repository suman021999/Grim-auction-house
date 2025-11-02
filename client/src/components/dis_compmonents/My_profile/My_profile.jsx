import React from 'react'
import Setting from '../Setting/Setting'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const My_profile = () => {
  return (
    <>
      <Setting/>

      <div className="px-4 sm:px-8 py-6 overflow-x-hidden mb-20 sm:mb-15">
        
        <Link
          to="/my_bid"
          className="px-4 w-full sm:w-1/2 py-4 sm:px-8 flex justify-between items-center 
                     bg-white rounded-xl shadow hover:bg-gray-100 transition"
        >
          <span>My Bids</span>
          <ChevronRight />
        </Link>

      </div>
    </>
  )
}

export default My_profile


