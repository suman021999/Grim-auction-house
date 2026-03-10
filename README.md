# 🏛️ Auction House

![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **real-time online auction platform** where users can create auctions, place bids, communicate with sellers, and track bidding activity live.

The platform allows **admins to manage auctions**, while **users can create auctions, bid on items, and chat with buyers/sellers after the auction ends**.

---

# 🚀 Live Demo

Frontend:  
https://your-frontend-url.com

Backend API:  
https://your-backend-url.com

---

# 📸 Screenshots

### Home Page
![Home](screenshots/home.png)

### Auction Page
![Auction](screenshots/auction.png)

### Bidding Interface
![Bidding](screenshots/bidding.png)

### Chat System
![Chat](screenshots/chat.png)

*(Create a `screenshots` folder in your repo and add images)*

---

# 🧠 Architecture Diagram

```
User
 │
 ▼
Frontend (React + Redux + Tailwind)
 │
 ▼
Backend API (Node.js + Express)
 │
 ├── Authentication (JWT / Google OAuth)
 ├── Auction Management
 ├── Bidding System
 └── Messaging System
 │
 ▼
MongoDB Database
 │
 ▼
Real-time Layer (Socket.IO)
```

---

# 🚀 Features

## 👤 User Features

- Register / Login (Email & Google OAuth)
- Create auctions
- View all auctions
- Place bids on items
- Real-time bidding updates
- Track auctions created by the user
- View bidding history
- My Bids page
- Live chat between buyer and seller after auction ends
- Account settings (change password)

---

## 🛠️ Admin Features

Currently admin access is **assigned manually via email**.

Admin capabilities:

- Approve auctions
- Reject auctions
- Manage auction listings
- Monitor bids

Future update:

Users will be able to **apply for admin role**.

---

# 🧠 System Flow

```
User creates auction
        ↓
Admin approves / rejects
        ↓
Approved auction appears on marketplace
        ↓
Users place bids
        ↓
Bids increase dynamically
        ↓
Auction ends
        ↓
Winner & seller communicate via chat
```

---

# 📂 Pages

## 🏠 Home / Auction Page

- Displays all active auctions
- Shows auction details
- Real-time bids
- Auction history
- Live chat option

## 📦 My Auctions

- Auctions created by the user
- Shows status of each auction

## 📊 All Bids

- List of all bids placed

## 💰 My Bids

- Auctions where the user has placed bids

## ⚙️ Settings

- Change password
- Account management

## 💬 Messages

- Buyer and seller communication after auction ends

---

# ⚙️ Tech Stack

## Frontend (Client)

- React
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Socket.IO Client
- Tailwind CSS
- Lucide React
- React Hot Toast
- GSAP
- Motion
- React OAuth Google

---

## Backend (Server)

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcrypt
- Multer
- Cloudinary
- Google Auth Library
- CORS
- Cookie Parser
- Dotenv

---

# 📡 Real-Time Features

Using **Socket.IO**

Real-time updates include:

- Live bid updates
- Auction activity
- Messaging system
- Admin notifications

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/auction-house.git
cd auction-house
```

---

## 2️⃣ Install Client Dependencies

```bash
cd client
npm install
```

Run client:

```bash
npm run dev
```

---

## 3️⃣ Install Server Dependencies

```bash
cd server
npm install
```

Run server:

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create `.env` file inside **server**

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

# 📁 Project Structure

```
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
```

---

# 📡 API Documentation

## Authentication

### Register User

```
POST /api/auth/register
```

Body:

```
{
  "name": "User",
  "email": "user@email.com",
  "password": "password"
}
```

---

### Login

```
POST /api/auth/login
```

---

## Auctions

### Create Auction

```
POST /api/auction/create
```

---

### Get All Auctions

```
GET /api/auction
```

---

### Place Bid

```
POST /api/bid
```

---

# 📌 Future Improvements

- Admin application system
- Payment gateway integration
- Auction countdown timers
- Email notifications
- Auction categories
- Advanced search & filters
- Mobile responsive improvements

---

# 👨‍💻 Author

**Suman Patra**

Full Stack Developer

GitHub:  
https://github.com/yourusername
