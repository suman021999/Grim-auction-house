
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { socket } from "../../../common/socket";
import Chat from "../chat/Chat";

const Auction = () => {
  const { id } = useParams();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [countdown, setCountdown] = useState("");

  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const BASE_AUCTION_URL = import.meta.env.VITE_AUCTION_URL;
  const BASE_BID_URL = import.meta.env.VITE_BID_URL;
  const BASE_REVIEW_URL = import.meta.env.VITE_REVIEW_URL;

  /* =========================
      FETCH AUCTION
  ========================= */

  useEffect(() => {
    const fetchAuction = async () => {
      const res = await axios.get(`${BASE_AUCTION_URL}/${id}`);
      setAuction(res.data.auction);
    };

    fetchAuction();
  }, [id]);

  /* =========================
      SOCKET CONNECTION
  ========================= */

  useEffect(() => {
    if (!auction?._id) return;

    socket.emit("joinAuction", auction._id);

    socket.on("bidPlaced", (data) => {
      if (data.auctionId === auction._id) {
        setAuction((prev) => ({
          ...prev,
          currentBid: data.amount,
        }));
      }
    });

    socket.on("bidHistoryUpdate", (data) => {
      setBids(data);
    });

    socket.on("auctionEnded", (data) => {
      if (data.auctionId === auction._id) {
        setAuction((prev) => ({
          ...prev,
          auctionStatus: "Ended",
          soldOut: true,
        }));
      }
    });

    return () => {
      socket.off("bidPlaced");
      socket.off("bidHistoryUpdate");
      socket.off("auctionEnded");
    };
  }, [auction]);

  /* =========================
      FETCH BID HISTORY
  ========================= */

  useEffect(() => {
    if (!auction?._id) return;

    const fetchBids = async () => {
      const res = await axios.get(`${BASE_BID_URL}/history/${auction._id}`);
      setBids(res.data.bids);
    };

    fetchBids();
  }, [auction]);

  /* =========================
      FETCH REVIEWS
  ========================= */

  useEffect(() => {
    if (!auction?._id) return;

    const fetchReviews = async () => {
      const res = await axios.get(`${BASE_REVIEW_URL}/${auction._id}`);
      setReviews(res.data.reviews);
    };

    fetchReviews();
  }, [auction]);

  /* =========================
      PLACE BID
  ========================= */

  const handlePlaceBid = async () => {
    try {
      await axios.post(
        `${BASE_BID_URL}/placebid`,
        {
          auctionId: auction._id,
          amount: Number(bidAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBidAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
      END AUCTION
  ========================= */

  const handleEndAuction = async () => {
    await axios.put(
      `${BASE_AUCTION_URL}/end/${auction._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  /* =========================
      SUBMIT REVIEW
  ========================= */

  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        `${BASE_REVIEW_URL}/add`,
        {
          auctionId: auction._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRating(0);
      setComment("");

      const res = await axios.get(`${BASE_REVIEW_URL}/${auction._id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
      COUNTDOWN TIMER
  ========================= */

  useEffect(() => {
    if (!auction?.time) return;

    const timer = setInterval(() => {
      const end = new Date(auction.time).getTime();
      const now = new Date().getTime();

      const diff = end - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown("Auction Ended");
        handleEndAuction();
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  if (!auction) return <p>Loading...</p>;

  const isAuctionEnded = auction.auctionStatus === "Ended";

  return (
    <>
      {/* MAIN SECTION */}
      <section className="grid md:grid-cols-3 gap-6 p-6">

        {/* LEFT */}
        <div className="col-span-2 bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">{auction.title}</h2>

            <p className="text-gray-500">
              Ends in: <span className="text-red-600">{countdown}</span>
            </p>
          </div>

          <img
            src={auction.image}
            className="w-full h-64 object-cover rounded mt-4"
          />

          <p className="mt-4 text-gray-600">{auction.description}</p>

          {/* CURRENT BID */}
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <p>Current Bid</p>
            <h2 className="text-2xl font-bold text-blue-600">
              ₹{auction.currentBid}
            </h2>
          </div>

          {/* PLACE BID */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6 mt-4">

            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border rounded-lg p-2 flex-1"
              placeholder="Enter bid"
            />

            <button
              onClick={handlePlaceBid}
              disabled={isAuctionEnded}
              className={`px-6 py-2 rounded-lg text-white ${
                isAuctionEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
            >
              {isAuctionEnded ? "Auction Ended" : "Place Bid"}
            </button>

          </div>

          {/* END BUTTON */}
          {storedUser?._id ||  storedUser?.id === auction.user && !isAuctionEnded && (
            <button
              onClick={handleEndAuction}
              className="bg-red-600 text-white px-6 py-2 rounded-lg mb-6"
            >
              End Auction
            </button>
          )}

          {/* BID HISTORY */}
          <div>

            <h3 className="font-semibold mb-3 text-lg">Bid History</h3>

            {bids.length === 0 ? (
              <p className="text-gray-400 text-sm">No bids yet</p>
            ) : (
              <ul className="space-y-3 text-sm max-h-48 overflow-y-auto no-scrollbar">

                {bids.map((bid) => (
                  <li
                    key={bid._id}
                    className="flex justify-between items-center pb-2 border-b"
                  >

                    <span className="font-semibold text-blue-600">
                      ₹{bid.amount}
                    </span>

                    <span className="text-gray-600">
                      by {bid.user?.username}
                    </span>

                    <span className="text-gray-400 text-xs">
                      {new Date(bid.createdAt).toLocaleString()}
                    </span>

                  </li>
                ))}

              </ul>
            )}

          </div>

        </div>

        {/* CHAT */}
        <div className="bg-white rounded-xl shadow">
          <Chat auctionId={auction._id} user={storedUser} />
        </div>

      </section>

     {/* TABS SECTION */}
<section className="grid grid-cols-1 m-4 md:grid-cols-3 gap-6 py-8 justify-center">
  <div className="md:col-span-3 bg-white rounded-2xl shadow p-6">

    {/* Tabs */}
    <div className="bg-white rounded-full p-1 shadow mb-6 w-fit">
      <div className="flex">

        <button
          onClick={() => setActiveTab("description")}
          className={`px-5 py-2 rounded-full ${
            activeTab === "description" ? "bg-slate-100" : ""
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2 rounded-full ${
            activeTab === "history" ? "bg-slate-100" : ""
          }`}
        >
          Auction History
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-5 py-2 rounded-full ${
            activeTab === "reviews" ? "bg-slate-100" : ""
          }`}
        >
          Reviews
        </button>

      </div>
    </div>

    {/* DESCRIPTION TAB */}
    {activeTab === "description" && (
      <div className="space-y-10">

        <div>
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {auction.description}
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-6">Product Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span>Category</span>
              <span>{auction.category}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Height</span>
              <span>{auction.productOverview?.height} cm</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Length</span>
              <span>{auction.productOverview?.length} cm</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Width</span>
              <span>{auction.productOverview?.width} cm</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Weight</span>
              <span>{auction.productOverview?.weight} kg</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Medium Used</span>
              <span>{auction.productOverview?.medium}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Sold Out</span>
              <span>{auction.soldOut ? "Yes" : "No"}</span>
            </div>

          </div>

          <div className="border-4 border-green-500 rounded-2xl overflow-hidden h-[80vh]">

            <img
              src={auction.image}
              alt="Auction Item"
              className="w-full h-full object-cover"
            />

          </div>

        </div>
      </div>
    )}

    {/* HISTORY TAB */}
    {activeTab === "history" && (
      <div>

        <h3 className="font-semibold mb-4 text-lg">
          Auction History
        </h3>

        {bids.length === 0 ? (
          <p className="text-gray-400 text-sm">No bids yet</p>
        ) : (

          <ul className="space-y-3 text-sm max-h-60 overflow-y-auto no-scrollbar">

            {bids.map((bid) => (
              <li
                key={bid._id}
                className="flex justify-between items-center pb-2 border-b"
              >

                <span className="font-semibold text-blue-600">
                  ₹{bid.amount}
                </span>

                <span className="text-gray-600">
                  by {bid.user?.username}
                </span>

                <span className="text-gray-400 text-xs">
                  {new Date(bid.createdAt).toLocaleString()}
                </span>

              </li>
            ))}

          </ul>

        )}

      </div>
    )}

    {/* REVIEWS TAB */}
    {activeTab === "reviews" && (
      <div>

        <h3 className="text-lg font-semibold mb-4">
          Customer Reviews
        </h3>

        <div className="mb-6 border p-4 rounded-lg bg-gray-50">

          <h4 className="font-semibold mb-2">
            Add Your Review
          </h4>

          <div className="flex mb-3 text-2xl cursor-pointer">
            {[1,2,3,4,5].map((star)=>(
              <span
                key={star}
                onClick={()=>setRating(star)}
                className={star <= rating ? "text-yellow-400":"text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-lg resize-none p-2 mb-3"
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Submit Review
          </button>

        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-400">
            No reviews yet
          </p>
        ) : (

          <div className="max-h-60 overflow-y-auto no-scrollbar pr-2">

            <ul className="space-y-4">

              {reviews.map((review)=>(
                <li key={review._id} className="border-b pb-3">

                  <p className="font-semibold">
                    {review.user?.username}
                  </p>

                  <div className="text-yellow-400 text-lg">
                    {[1,2,3,4,5].map((star)=>(
                      <span key={star}>
                        {star <= review.rating ? "★":"☆"}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600">
                    {review.comment}
                  </p>

                  <p className="text-gray-500">
                    {isAuctionEnded
                      ? "Auction Ended"
                      : `Ends: ${new Date(auction.time).toLocaleString()}`
                    }
                  </p>

                </li>
              ))}

            </ul>

          </div>

        )}

      </div>
    )}

  </div>
</section>
    </>
  );
};

export default Auction;



