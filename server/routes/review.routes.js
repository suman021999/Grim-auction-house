import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addReview);
router.get("/:auctionId", getReviews);

export default router;