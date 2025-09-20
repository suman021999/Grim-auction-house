import React from "react";
import RollingGallery from "../../common/RollingGallery";


const About = () => {
  return (
    <section className="w-full  py-4 md:py-16 lg:py-20">

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        
        {/* Left Section - Image/Card */}
        <div className="left w-full md:w-1/2 md:items-center flex justify-center md:justify-start">

         <RollingGallery autoplay={true} pauseOnHover={true} />

  

        </div>

        {/* Right Section - Text */}
        <div className="right w-full md:w-1/2 text-center md:text-left">
          <h2 className="font-[font3] text-customGreen1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            About Grim
          </h2>
          <p className="font-[font3] text-customGreen2 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            Founded with a vision to redefine auctions, Grim brings together
            collectors, dreamers, and investors from around the world. At Grim,
            every item tells a story — from timeless watches and fine jewelry to
            luxury cars and rare art. Our mission is simple: to create a trusted
            space where passion meets opportunity, and where treasures find their
            true owners. With innovation, transparency, and integrity at our
            core, Grim is more than an auction house — it’s where legacies begin.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
