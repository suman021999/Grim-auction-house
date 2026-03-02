
//Auction
import React, { useState } from "react";
import Chat from "../chat/Chat";
import Art from "../../../../public/scroll_images/Arts.png";

const Auction = () => {
  const [activeTab, setActiveTab] = useState("description");

  // Bid history data
  const bids = [
    { id: 1, amount: "$1,250.00", user: "UserXYZ", time: "2 mins ago" },
    { id: 2, amount: "$1,200.00", user: "Bidder123", time: "5 mins ago" },
    { id: 3, amount: "$1,150.00", user: "AuctionFan", time: "10 mins ago" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Rahul",
      comment: "Amazing product, worth bidding!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sneha",
      comment: "Good condition and authentic.",
      rating: 4,
    },
  ];

  return (
    <>
      {/* MAIN SECTION */}
      <section className="grid grid-cols-1 m-4 md:grid-cols-3 gap-6 py-20 sm:py-16 md:py-0 lg:py-0 justify-center">
        {/* Auction Details */}
        <div className="col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              Vintage Grandfather Clock
            </h2>
            <p className="text-gray-500">Time Left: 02:14:22</p>
          </div>

          <img
            src={Art}
            alt="Auction Item"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <p className="text-gray-600 mb-6">
            A beautifully preserved antique grandfather clock from the early
            20th century. Features intricate carvings and a fully functional
            chime mechanism.
          </p>

          {/* Current Bid */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-600 text-sm">Current Highest Bid:</p>
            <p className="text-2xl font-bold text-blue-600">$1,250.00</p>
          </div>

          {/* Bid Input */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
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
            <ul className="space-y-3 text-sm overflow-y-auto no-scrollbar max-h-24">
              {bids.map((bid) => (
                <li
                  key={bid.id}
                  className="flex justify-between items-center pb-1 border-b"
                >
                  <span className="font-medium">{bid.amount}</span>
                  <span className="text-blue-600">by {bid.user}</span>
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

      {/* NEW TABS SECTION */}
      <section className="grid grid-cols-1 m-4 md:grid-cols-3 gap-6 py-20 sm:py-16 md:py-8 lg:py-6 justify-center">
        <div className="md:col-span-3 bg-white rounded-2xl shadow p-6">
          {/* Tabs */}
          <div className="bg-white rounded-full p-1 shadow mb-6 w-fit">
            <div className="flex">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-5 py-2 text-black rounded-full font-medium transition ${
                  activeTab === "description" ? "bg-slate-100" : ""
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`px-5 py-2 text-black rounded-full font-medium transition ${
                  activeTab === "history" ? "bg-slate-100" : ""
                }`}
              >
                Auction History
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-5 py-2 text-black rounded-full font-medium transition ${
                  activeTab === "reviews" ? "bg-slate-100" : ""
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {activeTab === "description" && (
            <div className="space-y-10">
              {/* FULL DESCRIPTION */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vintage vinyl records are a beloved segment of music history
                  and collectibles, cherished for their rich sound quality and
                  nostalgic value.
                </p>
              </div>

              {/* PRODUCT OVERVIEW + IMAGE */}
              <h3 className="text-xl font-semibold mb-6">Product Overview</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT - PRODUCT OVERVIEW */}
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">Books & Media</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Height</span>
                    <span className="font-medium">12 cm</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Length</span>
                    <span className="font-medium">23 cm</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Width</span>
                    <span className="font-medium">23 cm</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">23 kg</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Medium Used</span>
                    <span className="font-medium">Charcoal</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">$3343</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Sold Out</span>
                    <span className="font-medium">No</span>
                  </div>
                </div>

                {/* RIGHT - IMAGE */}
                <div className="border-4 border-green-500 rounded-2xl overflow-hidden">
                  <img
                    src={Art}
                    alt="Auction Item"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Auction History</h3>
              <ul className="space-y-3 text-sm">
                {bids.map((bid) => (
                  <li
                    key={bid.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>{bid.amount}</span>
                    <span>{bid.user}</span>
                    <span className="text-gray-400">{bid.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li key={review.id} className="border-b pb-3">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p className="text-gray-600">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Auction;
