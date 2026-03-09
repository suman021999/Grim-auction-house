import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAuctions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_AUCTION_URL}/myauctions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAuctions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAuctions();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <section className="px-4 pb-20 m-4">
      {/* Header */}
      <div className="flex items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">My Auctions</h2>
      </div>

      {auctions.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          You haven't created any auctions yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {auctions.map((auction) => {
            const isEnded =
              new Date(auction.time) < new Date() ||
              auction.auctionStatus === "Ended";

            return (
              <div
                key={auction._id}
                className="bg-gray-100 rounded-2xl p-3 shadow-sm"
              >
                {/* Image */}
                <div className="p-3">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-52 object-cover rounded-xl"
                  />
                </div>

                {/* Content */}
                <div className="px-4 pb-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {auction.title}
                  </h3>

                  {/* Starting Bid */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      Starting Bid:
                    </span>
                    <span className="font-semibold">₹{auction.amountBid}</span>
                  </div>

                  {/* Current Bid */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      Current Bid:
                    </span>
                    <span className="font-semibold">₹{auction.currentBid}</span>
                  </div>

                  {/* Status */}
                  <div>
                    {isEnded ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-gray-700 text-white">
                        ENDED
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-green-600 text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Ends At: {new Date(auction.time).toLocaleString()}
                  </p>

                  {/* Button */}
                  <Link
                    to={`/auction/${auction._id}`}
                    className="block w-full mt-3 text-center py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View Auction
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyAuction;
