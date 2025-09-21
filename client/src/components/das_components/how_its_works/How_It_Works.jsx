import React from "react";
import { mechanism } from "../../../../data/data";

const How_It_Works = () => {
  return (
    <section id="how-it-works" className="py-8 md:py-12 lg:py-16 ">
      {/* Title */}
      <h2 className="font-[font3] text-customGreen3 mx-10 mb-3 text-xl md:text-2xl lg:text-3xl">
        How It Works
      </h2>
      <h4 className="font-[font3] text-customGreen2 capitalize mx-20 text-xl sm:text-lg md:text-xl lg:text-2xl my-4">
        easy four steps to win
      </h4>

      {/* Mechanism Grid */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {mechanism.map((step) => (
          <div
            key={step.id}
            className="font-[font3] flex flex-col items-center justify-center 
            bg-darkBg w-56 h-56 md:w-64 md:h-64 lg:w-68 lg:h-68 
            rounded-lg md:rounded-xl transition-transform hover:scale-105 p-4 text-center"
          >
            {/* Icon from public folder */}
            <img
              src={`/icons/${step.icon}.png`}
              alt={step.title}
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
            />

            {/* Title */}
            <h3 className="mt-3 text-sm md:text-base lg:text-lg text-customGreen2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs md:text-sm lg:text-base text-white leading-snug">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default How_It_Works;

