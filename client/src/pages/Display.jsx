import React from 'react'
import Banner from '../components/Banner/Banner'
import Categories from '../components/Categories/Categories'
import About from '../components/About/About'
import Live_Auction from '../components/LiveAuction/Live_Auction'
import How_It_Works from '../components/how_its_works/How_It_Works'
import Trust from '../components/Trust/Trust'
import FAQ from '../components/FAQ/FAQ'
import Contact from '../components/Contact/Contact'


const Display = () => {
  return (
    <>
      <section >
        
        <Banner/>
        <Categories/>
        <About/>
        <Live_Auction/>
        <div 
        className='bg-lightBg  m-10 rounded-3xl shadowBox'
          style={{
                backgroundImage: `linear-gradient(rgba(20, 26, 14, 0.8), rgba(79, 164, 9, 0.8))`,
                
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
        >
         <How_It_Works/>
         <Trust/>
        </div>
        <FAQ/>
        <Contact/>
      </section>
    </>
  )
}

export default Display
