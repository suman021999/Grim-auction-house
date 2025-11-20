// controllers/auction.controller.js
import asyncHandler from "express-async-handler";
import { Create } from "../models/create.models.js";
import { uploadAuctionImage } from "../config/cloudinary.js";
import { startAuctionCountdown } from "../utils/auctionTimer.js";


export const createAuction = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      time,       // expected ISO string or parseable date
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
      title,
      description,
      time,
      amountBid: Number(amountBid),
      category,
      height,
      width,
      length,
      weight,
      medium,
      image: imageUrl,
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
        console.warn("Socket.IO instance not found on app (app.get('io') returned falsy).");
      }
    } catch (emitErr) {
      // Non-fatal: log but don't fail the request
      console.warn("Error using Socket.IO for auction creation/start countdown:", emitErr);
    }

 return res.status(201).json({
  message: "Auction created successfully.",
  auction: {
    ...auction._doc,
    amountBid: `$${auction.amountBid}`,   // <–– always returns with $
  }
});

  } catch (error) {
    console.error("Create auction error:", error);
    return res.status(500).json({ message: "Server error while creating auction." });
  }
});




export const getAllAuctions = asyncHandler(async (req, res) => {})
export const getAuctionById = asyncHandler(async (req, res) => {})
export const endAuction = asyncHandler(async (req, res) => {})





