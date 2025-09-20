import React from 'react'
import {
  Watch,
  Plug,
  Gem,
  Volleyball,
  Car,
  Shirt,
  HousePlus,
  Palette,
} from "lucide-react";
import { data2 } from '../../../data/data';

// Define the icon map
const iconMap = {
  Watch,
  Plug,
  Gem,
  Volleyball,
  Car,
  Shirt,
  HousePlus,
  Palette,
};

const Categories = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <h2 className="font-[font3] mx-10 mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl lg:text-3xl">
        Browse the Categories
      </h2>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {data2.map((cat) => {
          const Icon = iconMap[cat.icon]; // Get correct icon component
          return (
            <div
              key={cat.id}
              className="font-[font3] text-4xl md:text-5xl lg:text-6xl flex flex-col items-center justify-center bg-midBg w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-lg md:rounded-xl transition-transform hover:scale-105 text-white"
            >
              <Icon className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20" />
              <span className="mt-2 text-xs md:text-sm lg:text-base text-customGreen3">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
