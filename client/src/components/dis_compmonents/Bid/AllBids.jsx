import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBids = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BID_URL}/getallbids`,
          { withCredentials: true },
        );
        setAuctions(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <section className="px-4 pb-20 m-4">
      <h2 className="text-xl font-bold mb-4">Active Auctions</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {auctions.length === 0 ? (
          <p className="text-gray-500">No active auctions available.</p>
        ) : (
          auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-gray-100 rounded-2xl p-3 shadow-sm"
            >
              <div className="p-3">
                <img
                  src={auction.img}
                  alt={auction.title}
                  className="w-full h-52 object-cover rounded-xl"
                />
              </div>

              <div className="px-4 pb-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {auction.title}
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Starting Bid:
                  </span>
                  <span className="font-semibold">${auction.startingBid}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Current Bid:
                  </span>
                  <span className="font-semibold">${auction.currentBid}</span>
                </div>

                <Link
                  to={`/auction/${auction.id}`}
                  className="block w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-xl font-medium transition"
                >
                  View & Place Bid
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AllBids;
