import asyncHandler from "express-async-handler";
import { Review } from "../models/review.model.js";
import { Create } from "../models/create.models.js";

// ✅ Add Review
export const addReview = asyncHandler(async (req, res) => {
  const { auctionId, rating, comment } = req.body;
  const userId = req.user._id;

  const auction = await Create.findById(auctionId);
  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  const review = await Review.create({
    auction: auctionId,
    user: userId,
    rating,
    comment,
  });

  res.status(201).json({ success: true, review });
});

// ✅ Get Reviews by Auction
export const getReviews = asyncHandler(async (req, res) => {
  const { auctionId } = req.params;

  const reviews = await Review.find({ auction: auctionId })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  res.json({ success: true, reviews });
});
