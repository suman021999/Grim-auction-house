import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add a review for an auction
router.post("/add", authMiddleware, addReview);

// Get reviews for an auction
router.get("/:auctionId", getReviews);

export default router;