// routes/chat.routes.js
import express from "express";
import {  getMessages, saveMessage } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all messages of auction
router.get("/:auctionId",  getMessages);
// Save message
router.post("/", authMiddleware, saveMessage);



export default router;