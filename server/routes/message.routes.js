// routes/message.routes.js
import express from "express";
import { getMessages, getMyConversations, sendMessage } from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

// Get my conversations
router.get("/my", authMiddleware, getMyConversations);

// Get messages of a conversation
router.get("/:conversationId", authMiddleware, getMessages);

// Send message
router.post("/", authMiddleware, sendMessage);

export default router;