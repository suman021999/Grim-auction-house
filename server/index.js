// index.js
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import database from './db/database.js';
import userRouter from './routes/user.routes.js'
import auctionRouter from './routes/auction.routes.js'
import bidRouter from './routes/bid.routes.js'
import reviewRoutes from "./routes/review.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import settingsRoutes from "./routes/setting.routes.js";
import { Chat } from "./models/chat.models.js";

import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://grim-auction-house.vercel.app"
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
  credentials: true
};

app.use(cors(corsOptions));

// Socket.IO Configuration
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://grim-auction-house.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }
});

// Make io accessible to routes and controllers
app.set('io', io);

// Database connection
database();



// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Routes
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/auction", auctionRouter)
app.use("/api/v1/bid",bidRouter)
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/setting", settingsRoutes);
app.use("/api/v1/chat", chatRoutes);


// Socket.IO connection handling (optional - for debugging)
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Join auction room
  socket.on("joinAuction", (auctionId) => {
    socket.join(auctionId);
    console.log(`User joined auction room: ${auctionId}`);
  });

  // Send Message
  socket.on("sendMessage", async (data) => {
    const { auctionId, senderId, message } = data;

    const newMessage = await Chat.create({
      auctionId,
      sender: senderId,
      message,
    });

    const populatedMessage = await newMessage.populate("sender", "username");

    // Send to all users in that auction room
    io.to(auctionId).emit("receiveMessage", populatedMessage);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});



const port = process.env.PORT 

// Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🔌 Socket.IO server initialized`);
});

