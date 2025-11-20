// //index.js
// import express from 'express';
// import dotenv from "dotenv";
// import cors from 'cors';
// import database from './db/database.js';
// import userRouter from './routes/user.routes.js'
// import auctionRouter from './routes/auction.routes.js'
// import cookieParser from 'cookie-parser';



// // Load environment variables
// dotenv.config();


// // Initialize Express app
// const app = express();

// // Database connection
// database();



// // CORS Configuration
// const corsOptions = {
//   origin: [
//     process.env.FRONTEND_URL || "http://localhost:5173",
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   optionsSuccessStatus: 200,
// };


// // Middleware
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// //Routes
// app.use("/api/v1/auth", userRouter)
// app.use("/api/v1/auction", auctionRouter)

// const port = process.env.PORT || 5000;

// // Server Startup
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });



// index.js
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import database from './db/database.js';
import userRouter from './routes/user.routes.js'
import auctionRouter from './routes/auction.routes.js'
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// Socket.IO Configuration
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }
});

// Make io accessible to routes and controllers
app.set('io', io);

// Database connection
database();

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Routes
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/auction", auctionRouter)

// Socket.IO connection handling (optional - for debugging)
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

const port = process.env.PORT || 5000;

// Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🔌 Socket.IO server initialized`);
});