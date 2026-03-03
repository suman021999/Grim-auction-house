import express from "express";
import { adminDashboard, approveAuction, cancelAuction, createAuction, getSingleAuction } from "../controllers/auction.controller.js";
import { upload } from "../utils/upload.js";
import { authMiddleware, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// /api/v1/auction/create
router.route("/create").post(authMiddleware, upload.single("image"), createAuction);

//Admin dashboard
router.route("/admin/dashboard").get(protect, adminDashboard);

// Approve Auction
router.route("/admin/approve/:id").put(protect, approveAuction);

// Reject Auction
router.route("/admin/reject/:id").put(protect, cancelAuction);

// Get single auction details
router.route("/:id").get(getSingleAuction);

export default router;
