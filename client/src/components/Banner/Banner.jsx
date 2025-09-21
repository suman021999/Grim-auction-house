import React from "react";
import Navbar from "../Navigation/Navbar";
import { data1 } from "../../../data/data";
import bannerImg from "../../../public/backgrounds/banner.png"

const Banner = () => {
  return (
    <section 
    id="#"
    className="w-full  py-6 md:py-10"
    style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-8">
        <Navbar />
        <div className="flex flex-col md:flex-row mt-8 md:mt-16 w-full">
          
          {/* Text Section */}
          <div className="right md:w-1/2 mb-8 md:mb-0 md:pr-6 lg:pr-10 lg:mx-6">
            <h1 className="font-[font3] text-customGreen1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Bid Beyond Limits. Own What Others Only Dream Of.
            </h1>
            <h4 className="font-[font3] text-customGreen2  text-xl sm:text-2xl md:text-3xl lg:text-4xl my-4">
              Bid, Win, and Own the Extraordinary.
            </h4>
            <p className="font-[font3] text-customGreen3 text-base sm:text-lg md:text-xl lg:text-2xl">
              Founded with a vision to redefine auctions, Grim brings together
              collectors, dreamers, and investors from around the world.
            </p>
          </div>

          {/* 3 Scrolling Columns */}
          <div className="left lg:mx-6 md:w-1/2 h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] mt-6 md:mt-0 rounded-xl flex items-center justify-center overflow-hidden gap-x-1">
            
            {/* Column 1 (Top ➝ Bottom, 2.5s) */}
            <div className="scroll-wrapper-y w-1/3">
              <div className="scroll-animation-y1 flex flex-col gap-2 items-center">
                {data1.concat(data1).map((item, i) => (
                  <img
                    key={`col1-${i}`}
                    src={`/scroll_images/${item.img}`}
                    alt={`col1-${i}`}
                    className="w-52 h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Column 2 (Bottom ➝ Top, 3s) */}
            <div className="scroll-wrapper-y w-1/3">
              <div className="scroll-animation-y2 flex flex-col gap-2 items-center">
                {data1.concat(data1).map((item, i) => (
                  <img
                    key={`col2-${i}`}
                    src={`/scroll_images/${item.img}`}
                    alt={`col2-${i}`}
                    className="w-52  h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Column 3 (Top ➝ Bottom, 3.5s) */}
            <div className="scroll-wrapper-y w-1/3">
              <div className="scroll-animation-y3 flex flex-col gap-2 items-center">
                {data1.concat(data1).map((item, i) => (
                  <img
                    key={`col3-${i}`}
                    src={`/scroll_images/${item.img}`}
                    alt={`col3-${i}`}
                    className="w-52 h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Banner;





