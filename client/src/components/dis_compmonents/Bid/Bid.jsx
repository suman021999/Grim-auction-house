import React from "react";

const bids = [
  {
    id: 1,
    title: "Vintage Grandfather Clock",
    img: "https://via.placeholder.com/300x200?text=Grandfather+Clock",
    yourBid: 1250,
    currentBid: 1250,
    status: "winning",
    timeLeft: "01h 25m 10s",
  },
  {
    id: 2,
    title: "Antique Silver Teapot",
    img: "https://via.placeholder.com/300x200?text=Silver+Teapot",
    yourBid: 320,
    currentBid: 350,
    status: "outbid",
    timeLeft: "00h 45m 30s",
  },
  {
    id: 3,
    title: "Rare Coin Collection",
    img: "https://via.placeholder.com/300x200?text=Coin+Collection",
    yourBid: 800,
    currentBid: 750,
    status: "winning",
    timeLeft: "02h 15m 00s",
  },
  {
    id: 4,
    title: "Vintage Leather Briefcase",
    img: "https://via.placeholder.com/300x200?text=Leather+Briefcase",
    yourBid: 180,
    currentBid: 180,
    status: "ended",
    timeLeft: "Ended: 2 days ago",
  },
];

const Bid = () => {
  return (
    <section className="p-4 py-20 sm:py-20 md:py-0  m-4">
      <h2 className="text-xl font-bold mb-4">My Bids</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border"
          >
            <img src={bid.img} alt={bid.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{bid.title}</h3>

              <div className="flex justify-between text-sm">
                <span>Your Bid:</span>
                <span>${bid.yourBid.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Current Bid:</span>
                <span>${bid.currentBid.toFixed(2)}</span>
              </div>

              {/* Status Badge */}
              {bid.status === "winning" && (
                <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-lg text-xs">
                  WINNING
                </span>
              )}
              {bid.status === "outbid" && (
                <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-lg text-xs">
                  OUTBID
                </span>
              )}
              {bid.status === "ended" && (
                <span className="inline-block px-3 py-1 bg-gray-500 text-white rounded-lg text-xs">
                  ENDED
                </span>
              )}

              <p className="text-xs text-gray-500">
                {bid.status === "ended" ? bid.timeLeft : `Time Left: ${bid.timeLeft}`}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                {bid.status === "outbid" && (
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Increase Bid
                  </button>
                )}
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
                  View Item
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bid;

