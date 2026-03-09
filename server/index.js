import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import database from "./db/database.js";

import userRouter from "./routes/user.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import bidRouter from "./routes/bid.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import settingsRoutes from "./routes/setting.routes.js";

import { Chat } from "./models/chat.models.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const server = createServer(app);





/* -------------------- CORS CONFIG -------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://grim-auction-house.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));




/* -------------------- SOCKET.IO -------------------- */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// make socket available in controllers
app.set("io", io);





/* -------------------- DATABASE -------------------- */

database();





/* -------------------- MIDDLEWARE -------------------- */

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));





/* -------------------- ROUTES -------------------- */

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auction", auctionRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/setting", settingsRoutes);
app.use("/api/v1/chat", chatRoutes);





/* -------------------- SOCKET CONNECTION -------------------- */

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  /* -------- AUCTION ROOM -------- */

  socket.on("joinAuction", (auctionId) => {
    socket.join(auctionId);
    console.log(`User joined auction room: ${auctionId}`);
  });

  /* -------- PRIVATE CHAT ROOM -------- */

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });





  /* -------- AUCTION CHAT MESSAGE -------- */

  socket.on("sendMessage", async (data) => {
    try {
      const { auctionId, senderId, message } = data;

      const newMessage = await Chat.create({
        auctionId,
        sender: senderId,
        message,
      });

      const populatedMessage = await newMessage.populate(
        "sender",
        "username"
      );

      io.to(auctionId).emit("receiveMessage", populatedMessage);
    } catch (error) {
      console.error("Socket message error:", error);
    }
  });





  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});





/* -------------------- SERVER START -------------------- */

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log("🔌 Socket.IO server initialized");
});