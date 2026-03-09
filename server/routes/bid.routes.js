import express from "express";
import { getAllBids,getBidHistory,getMyBids, placeBid } from "../controllers/bid.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

// Get all bids for an auction
router.route("/getallbids").get(getAllBids);

// Place a bid
router.route("/placebid").post(authMiddleware, placeBid);

// Get my bids
router.route("/getmybids").get(authMiddleware, getMyBids);

// Get bid history for an auction
router.route("/history/:auctionId").get(getBidHistory);


export default router;