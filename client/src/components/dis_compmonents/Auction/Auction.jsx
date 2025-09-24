import React from "react";
import Chat from "../chat/Chat";
import Art from "../../../../public/scroll_images/Arts.png";

const Auction = () => {
  // Bid history data
  const bids = [
    { id: 1, amount: "$1,250.00", user: "UserXYZ", time: "2 mins ago" },
    { id: 2, amount: "$1,200.00", user: "Bidder123", time: "5 mins ago" },
    { id: 3, amount: "$1,150.00", user: "AuctionFan", time: "10 mins ago" },
  ];

  return (
    <section className="grid grid-cols-1 m-4 md:grid-cols-3 gap-6 py-20 sm:py-16 md:py-0 lg:py-0">

      {/* Auction Details */}
      <div className="col-span-2  bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Vintage Grandfather Clock</h2>
          <p>Time</p>
        </div>

        <img
          src={Art}
          alt="Grandfather Clock"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-6">
          A beautifully preserved antique grandfather clock from the early 20th
          century. Features intricate carvings and a fully functional chime
          mechanism. A true collector's item.
        </p>

        {/* Current Bid */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-gray-600 text-sm">Current Highest Bid:</p>
          <p className="text-2xl font-bold text-blue-600">$1,250.00</p>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="number"
            placeholder="Your bid amount"
            className="border rounded-lg p-2 flex-1"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Place Bid
          </button>
        </div>

  {/* Bid History */}
<div >
  <h3 className="font-semibold mb-2">Bid History</h3>
  <ul className="space-y-3 text-sm overflow-y-auto no-scrollbar max-h-24">
    {bids.map((bid) => (
      <li
        key={bid.id}
        className="flex justify-between items-center pb-1 border-b-2 border-b-customGreen1"
      >
        <span className="font-medium">{bid.amount}</span>
        <span className="text-blue-600 hover:underline">by {bid.user}</span>
        <span className="text-gray-400">{bid.time}</span>
      </li>
    ))}
  </ul>
</div>



      </div>

      {/* Chat Section */}
      <div className="bg-white rounded-2xl shadow">
        <Chat />
      </div>
    </section>
  );
};

export default Auction;

