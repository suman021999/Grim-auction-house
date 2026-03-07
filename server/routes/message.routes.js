// routes/message.routes.js
import express from "express";
import { getMessages, getMyConversations, sendMessage } from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/my", authMiddleware, getMyConversations);

router.get("/:conversationId", authMiddleware, getMessages);

router.post("/", authMiddleware, sendMessage);

export default router;