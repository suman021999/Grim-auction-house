🏛️ Auction House

A real-time online auction platform where users can create auctions, place bids, communicate with sellers, and track bidding activity live.

The platform allows admins to manage auctions, while users can create auctions, bid on items, and chat with buyers/sellers after the auction ends.

🚀 Features
👤 User Features

Register / Login (Email & Google OAuth)

Create auctions

View all auctions

Place bids on items

Real-time bidding updates

Track auctions created by the user

View bidding history

My Bids page

Live chat between buyer and seller after auction ends

Account settings (change password)

🛠️ Admin Features

Currently admin access is assigned manually via email.

Admin capabilities:

Approve auctions

Reject auctions

Manage auction listings

Monitor bids

Future update:

Users will be able to apply for admin role

🧠 System Flow

User creates auction

Admin approves or rejects

Approved auctions appear on auction page

Users place bids

Bids increase dynamically

Auction ends

Winner and seller can communicate through chat

📂 Pages
Home / Auction Page

Displays all active auctions

Shows auction details

Real-time bids

Auction history

Live chat option

My Auctions

Auctions created by the user

Shows status of each auction

All Bids

List of all bids placed

My Bids

Auctions where the user has placed bids

Settings

Change password

Account management

Messages

Buyer and seller communication after auction ends

⚙️ Tech Stack
Frontend (Client)

React – UI library

Vite – Fast development and build tool

Redux Toolkit – State management

React Router DOM – Routing

Axios – API communication

Socket.IO Client – Real-time updates

Tailwind CSS – Styling

Lucide React – Icons

React Hot Toast – Notifications

GSAP – Animations

Motion – UI animations

React OAuth Google – Google login

Backend (Server)

Node.js

Express.js

MongoDB

Mongoose

Socket.IO – Real-time bid updates

JWT (jsonwebtoken) – Authentication

bcrypt – Password hashing

Multer – File uploads

Cloudinary – Image storage

Google Auth Library – Google authentication

CORS

Cookie Parser

Dotenv

📡 Real-Time Features

Using Socket.IO

Real-time updates include:

Live bid updates

Auction activity

Messaging system

Admin notifications

📦 Installation
1️⃣ Clone Repository
git clone https://github.com/yourusername/auction-house.git
cd auction-house
2️⃣ Install Client Dependencies
cd client
npm install

Run client:

npm run dev
3️⃣ Install Server Dependencies
cd server
npm install

Run server:

npm run dev
🔐 Environment Variables

Create .env file inside server

Example:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
📁 Project Structure
auction-house
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── common
│   │   └── App.jsx
│
├── server
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   └── index.js
📌 Future Improvements

Admin application system

Payment gateway integration

Auction countdown timers

Email notifications

Auction categories

Advanced search & filters

Mobile responsive improvements

👨‍💻 Author

Suman Patra

Full Stack Developer
