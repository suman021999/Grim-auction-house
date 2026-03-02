import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch My Bids
  const fetchMyBids = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_BID_URL}/getmybids`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBids(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  // 🔥 Increase Bid
  const handleIncreaseBid = async (auctionId, currentBid) => {
    try {
      const token = localStorage.getItem("token");

      // 🔥 You can change increment logic here
      const newAmount = currentBid + 100;

      await axios.post(
        `${import.meta.env.VITE_BID_URL}/placebid`,
        {
          auctionId,
          amount: newAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Bid Increased Successfully 🚀");

      // 🔥 Refresh without reload
      fetchMyBids();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) return <div className="p-6">Loading your bids...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <section className="px-4 pb-20 m-4">
      {/* Header */}
      <div className="flex items-center mb-6 gap-4">
        <Link
          to="/user"
          className="bg-white rounded-xl shadow hover:bg-gray-100 transition p-2"
        >
          <ChevronLeft />
        </Link>
        <h2 className="text-2xl font-bold">My Bids</h2>
      </div>

      {bids.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No active auctions available.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-gray-100 rounded-2xl p-3 shadow-sm">
              {/* Image */}
              <div className="p-3">
                <img
                  src={bid.img}
                  alt={bid.title}
                  className="w-full h-52 object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="px-4 pb-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {(() => {
                    const words = bid.title.split(" ");
                    return words.length > 2
                      ? words.slice(0, 2).join(" ") + "..."
                      : bid.title;
                  })()}
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Your Bid:</span>
                  <span className="font-semibold">${bid.yourBid}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Current Bid:
                  </span>
                  <span className="font-semibold">${bid.currentBid}</span>
                </div>

                {/* Status Badge */}
                <div>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md ${
                      bid.status === "winning"
                        ? "bg-green-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {bid.status.toUpperCase()}
                  </span>
                </div>

                {/* Time */}
                <p className="text-xs text-gray-500">
                  Ends At: {new Date(bid.time).toLocaleString()}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-3">
                  {bid.status !== "winning" && (
                    <button
                      onClick={() => handleIncreaseBid(bid.id, bid.currentBid)}
                      className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2.5 rounded-xl font-medium transition"
                    >
                      Increase Bid
                    </button>
                  )}

                  <Link
                    to={`/auction/${bid.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-xl font-medium transition"
                  >
                    View Item
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBids;
