import asyncHandler from "express-async-handler";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, admin: user.admin, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "9999d" }
  );
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GOOGLE LOGIN
export const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("No token provided");
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { email, name, picture, sub } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    const username = email.split("@")[0].slice(0, 4);

    user = await User.create({
      fullname: name,
      username,
      email,
      googleId: sub,
      provider: "google",
      avatar: picture,
      password: null,
    });
  }

  const jwtToken = generateToken(user);

  res.json({
    success: true,
    token: jwtToken,
    user: {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

// REGISTER
export const registerAccount = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  if (username.length !== 4) {
    res.status(400);
    throw new Error("Username must be exactly 4 characters");
  }

  const exist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // AUTO ROLE ASSIGN
  let role = "user";
  if (email.toLowerCase().trim() === "patra6319@gmail.com") {
    role = "admin";
  }

  const user = new User({
    fullname: fullname.toLowerCase().trim(),
    username,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    provider: "local",
    role,
  });

  await user.save();

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

// LOGIN
export const loginAccount = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password are required" });
  }

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = generateToken(user);

  const { password: _, ...userData } = user.toObject();

  return res.status(200).json({
    msg: "Login successful",
    token,
    user: {
      ...userData,
      avatar: user.avatar,
      admin: user.admin,
    },
  });
});

// ADMIN ROUTE
export const admin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. You are not admin." });
  }

  res.status(200).json({
    success: true,
    msg: "Admin access granted",
    user,
  });
});

// LOGOUT
export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});
