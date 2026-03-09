// controllers/message.controller.js

import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.modals.js";

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, receiver, text } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user._id,
      receiver,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Messages for a Conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get User's Conversations
export const getMyConversations = async (req, res) => {
  const conversations = await Conversation.find({
    $or: [{ buyer: req.user._id }, { seller: req.user._id }],
  })
    .populate("buyer", "username")
    .populate("seller", "username")
    .populate("auctionId", "title image");

  res.json(conversations);
};
