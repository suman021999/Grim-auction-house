// controllers/chat.controller.js
import asyncHandler from "express-async-handler";
import { Chat } from "../models/chat.models.js";

// 📩 Get Messages for an Auction
export const getMessages = asyncHandler(async (req, res) => {
  const { auctionId } = req.params;

  const messages = await Chat.find({ auctionId, })
    .populate("sender", "username")
    .sort({ createdAt: 1 });

  res.status(200).json(messages);
});


// 💬 Save Message (Optional API if needed)
export const saveMessage = asyncHandler(async (req, res) => {
  const { auctionId, message } = req.body;
  const userId = req.user._id;

  const newMessage = await Chat.create({
    auctionId,
    sender: userId,
    message,
  });

  const populatedMessage = await newMessage.populate("sender", "username");

  // 🔥 Emit message using socket
  const io = req.app.get("io");
  io.to(auctionId).emit("receiveMessage", populatedMessage);

  res.status(201).json(populatedMessage);
});



