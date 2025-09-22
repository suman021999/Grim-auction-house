import React from "react";
import Chat from "../chat/Chat";
import Art from "../../../../public/scroll_images/Arts.png";

const Auction = () => {
  return (
    <section className="grid grid-cols-1 m-4  md:grid-cols-3 gap-6 py-20 sm:py-16 md:py-0 lg:py-0">
      {/* p-6 */}
      {/* Auction Details */}
      <div className="col-span-2 bg-white rounded-2xl shadow p-6">
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
        <div>
          <h3 className="font-semibold mb-2">Bid History</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center pb-1 border-b-2 border-b-customGreen1">
              <span className="font-medium">$1,250.00</span>
              <span className="text-blue-600 hover:underline">by UserXYZ</span>
              <span className="text-gray-400">2 mins ago</span>
            </li>
            <li className="flex justify-between items-center pb-1 border-b-2 border-b-customGreen1">
              <span className="font-medium">$1,200.00</span>
              <span className="text-blue-600 hover:underline">
                by Bidder123
              </span>
              <span className="text-gray-400">5 mins ago</span>
            </li>
            <li className="flex justify-between items-center pb-1 border-b-2 border-b-customGreen1">
              <span className="font-medium">$1,150.00</span>
              <span className="text-blue-600 hover:underline">
                by AuctionFan
              </span>
              <span className="text-gray-400">10 mins ago</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Chat Section */}
      <div className="bg-white rounded-2xl shadow ">
        
        <Chat />
      </div>
    </section>
  );
};

export default Auction;
