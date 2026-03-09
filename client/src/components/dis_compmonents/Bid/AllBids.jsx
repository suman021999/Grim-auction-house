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
      <h2 className="text-2xl font-bold mb-4">Active Auctions</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {auctions.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-500 text-center">
              No active auctions available.
            </p>
          </div>
        ) : (
          auctions.map((auction) => {
            const isEnded =
              new Date(auction.time) < new Date() ||
              auction.auctionStatus === "Ended";

            return (
              <div
                key={auction.id}
                className="bg-gray-100 rounded-2xl p-3 shadow-sm"
              >
                {/* Image */}
                <div className="p-3">
                  <img
                    src={auction.img}
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
                    <span className="font-semibold text-right break-all max-w-[60%]">
                      ${Number(auction.startingBid).toLocaleString()}
                    </span>
                  </div>

                  {/* Current Bid */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      Current Bid:
                    </span>
                    <span className="font-semibold text-right break-all max-w-[60%]">
                      ${Number(auction.currentBid).toLocaleString()}
                    </span>
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

                  {/* Time */}
                  <p className="text-xs text-gray-500">
                    Ends At: {new Date(auction.time).toLocaleString()}
                  </p>

                  {/* Button */}
                  <Link
                    to={`/auction/${auction.id}`}
                    className={`block w-full mt-3 text-center py-2.5 rounded-xl font-medium transition ${
                      isEnded
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isEnded ? "Auction Ended" : "View & Place Bid"}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default AllBids;
