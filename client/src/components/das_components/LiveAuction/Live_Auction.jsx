import React from "react";
import AuctionCard from "../../../common/AuctionTimer"
import { auctions } from "../../../../data/data";


const Live_Auction = () => {
  return (
    <section id="auctions" className="py-8 md:py-12 lg:py-16">
      <h2 className="font-[font3] mx-10 mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl lg:text-3xl text-customGreen3">Live Auction</h2>
      <div className="flex  flex-wrap items-start gap-3 lg:gap-2">
        
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>
    </section>
  );
};

export default Live_Auction;

