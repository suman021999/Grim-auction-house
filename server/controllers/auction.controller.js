// controllers/auction.controller.js
import asyncHandler from "express-async-handler";
import { Create } from "../models/create.models.js";
import { uploadAuctionImage } from "../config/cloudinary.js";
import { startAuctionCountdown } from "../utils/auctionTimer.js";
import { Conversation } from "../models/conversation.model.js";
import { Bid } from "../models/bid.models.js";

// ✔ Create Auction
export const createAuction = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      time,
      amountBid,
      category,
      height,
      width,
      length,
      weight,
      medium,
    } = req.body;

    // validation
    if (!title || !description || !time || !amountBid || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // image upload
    let imageUrl = "";

    if (req.file && req.file.buffer) {
      try {
        imageUrl = await uploadAuctionImage(req.file.buffer, req.file.mimetype);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // create auction
    const auction = await Create.create({
      user: req.user._id,
      title,
      description,
      time: new Date(time),
      amountBid: Number(amountBid),
      currentBid: Number(amountBid),
      category,
      height: height ? Number(height) : null,
      width: width ? Number(width) : null,
      length: length ? Number(length) : null,
      weight: weight ? Number(weight) : null,
      medium,
      image: imageUrl,
      adminStatus: "Pending",
      auctionStatus: "Active",
      soldOut: false,
    });

    // socket instance
    const io = req.app.get("io");

    if (io) {
      // broadcast new auction
      io.emit("auctionCreated", auction);

      // start countdown
      startAuctionCountdown(io, auction._id.toString(), auction.time);
    }

    res.status(201).json({
      success: true,
      message: "Auction created successfully",
      auction,
    });
  } catch (error) {
    console.error("Create auction error:", error);

    res.status(500).json({
      success: false,
      message: "Server error creating auction",
    });
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
      currentBid: item.currentBid ?? item.amountBid ?? 0,
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

    // ✅ HISTORY = ONLY APPROVED auctions
    const history = {
      active: all
        .filter(
          (i) => i.auctionStatus === "Active" && i.adminStatus === "Approved"
        )
        .map(formatItem),

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
        (acc, cur) => acc + (cur.currentBid ?? 0),
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

// ✔ GET MY AUCTIONS
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

// ✔ End Auction
// export const endAuction = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const auction = await Create.findById(id);

//   if (!auction) {
//     return res.status(404).json({ message: "Auction not found" });
//   }

//   auction.auctionStatus = "Ended";
//   auction.soldOut = true;

//   await auction.save();

//   const highestBid = await Bid.findOne({ auction: id })
//     .sort({ amount: -1 })
//     .populate("user");

//   let conversation = null;

//   if (highestBid) {
//     conversation = await Conversation.findOne({
//       auctionId: auction._id,
//       buyer: highestBid.user._id,
//       seller: auction.user,
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         auctionId: auction._id,
//         buyer: highestBid.user._id,
//         seller: auction.user,
//       });
//     }
//   }

//   // 🔥 SOCKET EVENT
//   const io = req.app.get("io");

//   io.to(id).emit("auctionEnded", {
//     auctionId: id,
//     soldOut: true,
//     winner: highestBid?.user,
//   });

//   if (conversation) {
//     io.to(highestBid.user._id.toString()).emit(
//       "conversationCreated",
//       conversation
//     );

//     io.to(auction.user.toString()).emit("conversationCreated", conversation);
//   }

//   res.json({
//     success: true,
//     message: "Auction ended",
//   });
// });



export const endAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const auction = await Create.findById(id);

  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  // ✅ Prevent ending twice
  if (auction.auctionStatus === "Ended") {
    return res.status(400).json({
      success: false,
      message: "Auction already ended",
    });
  }

  // ✅ End auction
  auction.auctionStatus = "Ended";
  auction.soldOut = true;

  await auction.save();

  // ✅ Find highest bid
  const highestBid = await Bid.findOne({ auction: id })
    .sort({ amount: -1 })
    .populate("user");

  let conversation = null;

  if (highestBid && highestBid.user) {
    conversation = await Conversation.findOne({
      auctionId: auction._id,
      buyer: highestBid.user._id,
      seller: auction.user,
    });

    // ✅ Create conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        auctionId: auction._id,
        buyer: highestBid.user._id,
        seller: auction.user,
      });
    }
  }

  // ✅ SOCKET EVENTS
  const io = req.app.get("io");

  if (io) {
    io.to(id).emit("auctionEnded", {
      auctionId: id,
      soldOut: true,
      winner: highestBid?.user || null,
    });

    if (conversation) {
      io.to(highestBid.user._id.toString()).emit(
        "conversationCreated",
        conversation
      );

      io.to(auction.user.toString()).emit(
        "conversationCreated",
        conversation
      );
    }
  }

  res.json({
    success: true,
    message: "Auction ended successfully",
    winner: highestBid?.user || null,
  });
});
