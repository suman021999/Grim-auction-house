import express from "express";
import { getAllBids,getBidHistory,getMyBids, placeBid } from "../controllers/bid.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

//api/v1/bid/getallbids
router.route("/getallbids").get(getAllBids);
//api/v1/bid/placebid
router.route("/placebid").post(authMiddleware, placeBid);
//api/v1/bid/getmybids
router.route("/getmybids").get(authMiddleware, getMyBids);
//api/v1/bid/gethistroy
router.route("/history/:auctionId").get(getBidHistory);


export default router;