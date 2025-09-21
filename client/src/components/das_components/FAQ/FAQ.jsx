import React, { useState } from "react";
import { Plus } from "lucide-react";
import { faqData } from "../../../../data/data";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="rounded-3xl py-8 shadow-lg bg-white mt-12">
      <h2 className="text-customGreen3 text-xl sm:text-2xl md:text-3xl font-[font3] mb-6 px-4 sm:px-10">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="space-y-4 px-4 sm:px-10 md:px-20 lg:px-8 max-w-screen-lg mx-auto">
        {faqData.map((item) => (
          <div
            key={item.id}
            className="border-b-2 border-customGreen5 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(item.id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-[font3] text-customGreen2 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                {item.question}
              </h3>
              <Plus
                className={`transition-transform text-customGreen6 ${
                  openId === item.id ? "rotate-180" : ""
                }`}
              />
            </div>

            {openId === item.id && (
              <p className="mt-2 text-customGreen5 text-base sm:text-lg md:text-xl lg:text-2xl font-[font4]">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;


