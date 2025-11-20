import express from "express";
import { createAuction } from "../controllers/auction.controller.js";
import { upload } from "../utils/upload.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// /api/v1/auction/create
router.route("/create").post(authMiddleware, upload.single("image"), createAuction);

export default router;
