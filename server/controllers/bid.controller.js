// controllers/bid.controller.js
import asyncHandler from "express-async-handler";
import { Create } from "../models/create.models.js";
import { Bid } from "../models/bid.models.js";

// place bid
export const placeBid = asyncHandler(async (req, res) => {
  const { auctionId, amount } = req.body;
  const userId = req.user._id;

  const auction = await Create.findById(auctionId);

  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  if (auction.auctionStatus === "Ended") {
    return res.status(400).json({ message: "Auction ended" });
  }

  if (amount <= auction.currentBid) {
    return res
      .status(400)
      .json({ message: "Bid must be higher than current bid" });
  }

  // update previous bids
  await Bid.updateMany(
    { auction: auctionId, bidStatus: "Winning" },
    { bidStatus: "Outbid" }
  );

  const existingBid = await Bid.findOne({
    auction: auctionId,
    user: userId,
  });

  let bid;

  if (existingBid) {
    existingBid.amount = amount;
    existingBid.bidStatus = "Winning";
    bid = await existingBid.save();
  } else {
    bid = await Bid.create({
      auction: auctionId,
      user: userId,
      amount,
      bidStatus: "Winning",
    });
  }

  auction.currentBid = amount;
  auction.highestBidder = userId;
  await auction.save();

  // 🔥 SOCKET EMIT
  const io = req.app.get("io");

  io.to(auctionId).emit("bidPlaced", {
    auctionId,
    amount,
    bidder: userId,
  });

  // update bid history
  const bids = await Bid.find({ auction: auctionId })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  io.to(auctionId).emit("bidHistoryUpdate", bids);

  res.status(201).json({
    success: true,
    message: "Bid placed successfully",
  });
});

// allbids
export const getAllBids = asyncHandler(async (req, res) => {
  const auctions = await Create.find({
    adminStatus: "Approved",
    auctionStatus: "Active",
  })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  const result = auctions.map(a => ({
    id: a._id,
    title: a.title,
    img: a.image,
    startingBid: a.amountBid,
    currentBid: a.currentBid || a.amountBid,
    time: a.time,
  }));

  res.json(result);
});

//Mybids
// controllers/bidController.js

export const getMyBids = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 🔥 1️⃣ Get auctions created by this user
  const myCreatedAuctions = await Create.find({
    user: userId,
    adminStatus: "Approved",
  });

  // 🔥 2️⃣ Get bids placed by this user
  const myBids = await Bid.find({ user: userId }).populate("auction");

  // 🔥 Prevent crash if auction is null
  const bidAuctionIds = myBids
    .filter((b) => b.auction)
    .map((b) => b.auction._id.toString());

  // 🔥 3️⃣ Format created auctions
  const createdFormatted = myCreatedAuctions
    .filter((a) => !bidAuctionIds.includes(a._id.toString()))
    .map((a) => ({
      id: a._id,
      bidId: null,
      title: a.title,
      img: a.image,
      yourBid: a.amountBid,
      currentBid: a.currentBid || a.amountBid,
      status:
        a.highestBidder?.toString() === userId.toString()
          ? "winning"
          : "outbid",
      time: a.time,
      auctionStatus: a.auctionStatus, // 🔥 send status
    }));

  // 🔥 4️⃣ Format bids
  const bidFormatted = myBids
    .filter((b) => b.auction) // prevent null auction crash
    .map((b) => ({
      id: b.auction._id,
      bidId: b._id,
      title: b.auction.title,
      img: b.auction.image,
      yourBid: b.amount,
      currentBid: b.auction.currentBid,
      status:
        b.auction.highestBidder?.toString() === userId.toString()
          ? "winning"
          : "outbid",
      time: b.auction.time,
      auctionStatus: b.auction.auctionStatus, // 🔥 send status
    }));

  // 🔥 5️⃣ Merge results
  const result = [...bidFormatted, ...createdFormatted];

  res.status(200).json(result);
});


//bid history
export const getBidHistory = asyncHandler(async (req, res) => {
  const { auctionId } = req.params;

  const auction = await Create.findById(auctionId);
  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  const bids = await Bid.find({ auction: auctionId })
    .populate("user", "username email") // show bidder info
    .sort({ createdAt: -1 }); // latest first

  res.status(200).json({
    success: true,
    totalBids: bids.length,
    bids,
  });
});




