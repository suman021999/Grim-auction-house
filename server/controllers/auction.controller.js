// controllers/auction.controller.js
import asyncHandler from "express-async-handler";
import { Create } from "../models/create.models.js";
import { uploadAuctionImage } from "../config/cloudinary.js";
import { startAuctionCountdown } from "../utils/auctionTimer.js";
import { Conversation } from "../models/conversation.model.js";

// ✔ Create Auction
export const createAuction = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      time, // expected ISO string or parseable date
      amountBid,
      category,
      height,
      width,
      length,
      weight,
      medium,
    } = req.body;

    // Basic validation
    if (!title || !description || !time || !amountBid || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Upload image if provided
    let imageUrl = "";
    if (req.file && req.file.buffer) {
      try {
        imageUrl = await uploadAuctionImage(req.file.buffer, req.file.mimetype);
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        return res.status(500).json({ message: "Image upload failed." });
      }
    }

    // Create auction document
    const auction = await Create.create({
      user: req.user._id,
      title,
      description,
      time,
      amountBid: Number(amountBid),
      category,
      height: Number(height),
      width: Number(width),
      length: Number(length),
      weight: Number(weight),
      medium,
      image: imageUrl,
      adminStatus: "Pending",
      auctionStatus: "Active",
    });

    // Get io and broadcast new auction to clients
    try {
      const io = req.app.get("io");
      if (io) {
        // Broadcast newly created auction globally (or adjust to emit to admin clients)
        io.emit("auctionCreated", auction);

        // Start the countdown for this auction (if time is valid)
        // Ensure auction.time is an ISO string or convertible to Date
        startAuctionCountdown(io, auction._id.toString(), auction.time);
      } else {
        console.warn(
          "Socket.IO instance not found on app (app.get('io') returned falsy)."
        );
      }
    } catch (emitErr) {
      // Non-fatal: log but don't fail the request
      console.warn(
        "Error using Socket.IO for auction creation/start countdown:",
        emitErr
      );
    }

    return res.status(201).json({
      message: "Auction created successfully.",
      auction: {
        ...auction._doc,
        amountBid: `$${auction.amountBid}`, // <–– always returns with $
      },
    });
  } catch (error) {
    console.error("Create auction error:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating auction." });
  }
});
// admin dashboard data
export const adminDashboard = asyncHandler(async (req, res) => {
  try {
    const all = await Create.find({})
      .sort({ createdAt: -1 })
      .populate("user", "username");

    const formatItem = (item) => ({
      id: item._id,
      username: item.user?.username || "Unknown",
      image: item.image || "",
      name: item.title,
      bid: item.amountBid ?? 0,
      currentBid: item.amountBid ?? 0,
      time: item.time,
      category: item.category,
      createdAt: item.createdAt,
      adminStatus: item.adminStatus,
      auctionStatus: item.auctionStatus,
    });

    // ✅ REVIEW = adminStatus items
    const review = {
      pending: all.filter((i) => i.adminStatus === "Pending").map(formatItem),
      approved: all.filter((i) => i.adminStatus === "Approved").map(formatItem),
      rejected: all.filter((i) => i.adminStatus === "Rejected").map(formatItem),
    };

    // ✅ HISTORY = auctionStatus items

    // ✅ HISTORY = ONLY APPROVED auctions
    const history = {
      active: all
        .filter(
          (i) => i.auctionStatus === "Active" && i.adminStatus === "Approved"
        )
        .map(formatItem),

      // winning: all
      //   .filter(i => i.auctionStatus === "Winning" && i.adminStatus === "Approved").map(formatItem),

      // outbid: all
      //   .filter(i => i.auctionStatus === "Outbid" && i.adminStatus === "Approved").map(formatItem),

      ended: all
        .filter(
          (i) => i.auctionStatus === "Ended" && i.adminStatus === "Approved"
        )
        .map(formatItem),
    };

    const summary = {
      activeAuctions: history.active.length,
      activeUsers: new Set(history.active.map((i) => i.username)).size,
      revenue: history.ended.reduce(
        (acc, cur) => acc + (cur.amountBid ?? 0),
        0
      ),
    };

    return res.status(200).json({
      review,
      history,
      summary,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ✔ Approve Auction Approval
export const approveAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const auction = await Create.findById(id);
  if (!auction) return res.status(404).json({ message: "Auction not found" });

  auction.adminStatus = "Approved";
  await auction.save();

  res.json({ success: true, message: "Auction approved" });
});

// ✔ Cancel Auction Approval
export const cancelAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const auction = await Create.findById(id);
  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  await Create.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Auction cancelled and removed permanently",
  });
});

// ✅ GET SINGLE AUCTION
export const getSingleAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const auction = await Create.findById(id).populate("user", "username");

  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  res.status(200).json({
    success: true,
    auction: {
      _id: auction._id,
      title: auction.title,
      description: auction.description,
      image: auction.image,
      time: auction.time,
      category: auction.category,

      startingBid: auction.amountBid,
      currentBid: auction.currentBid || auction.amountBid,
      highestBidder: auction.highestBidder,

      productOverview: {
        height: auction.height,
        width: auction.width,
        length: auction.length,
        weight: auction.weight,
        medium: auction.medium,
      },

      soldOut: auction.auctionStatus === "Ended",
      auctionStatus: auction.auctionStatus,

      createdBy: auction.user?.username || "Unknown",
    },
  });
});

 export const getMyAuctions = async (req, res) => {
  try {
    const auctions = await Create.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const endAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const auction = await Create.findById(id);

  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  auction.auctionStatus = "Ended";
  auction.soldOut = true;
  await auction.save();

  // 🔥 find highest bid
  const highestBid = await Bid.findOne({ auctionId: id })
    .sort({ amount: -1 })
    .populate("user");

  const existingConversation = await Conversation.findOne({
    auctionId: auction._id,
  });

  if (!existingConversation && highestBid) {
    await Conversation.create({
      auctionId: auction._id,
      buyer: highestBid.user._id,
      seller: auction.user,
    });
  }

  res.json({
    success: true,
    message: "Auction ended and conversation created",
  });
});


