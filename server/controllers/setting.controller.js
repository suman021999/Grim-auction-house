//setting.controller.js

import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { Setting } from "../models/setting.models.js";

// ==========================
// GET USER SETTINGS
// ==========================
export const getSettings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("username email");

  let setting = await Setting.findOne({ user: userId });

  if (!setting) {
    setting = await Setting.create({ user: userId });
  }

  res.status(200).json({
    username: user.username,
    email: user.email,
    profileVisibility: setting.profileVisibility,
    dataSharing: setting.dataSharing,
  });
});

// ==========================
// UPDATE PASSWORD
// ==========================
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Both passwords are required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;

  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

// ==========================
// UPDATE PRIVACY SETTINGS
// ==========================
export const updatePrivacy = asyncHandler(async (req, res) => {
  let { profileVisibility, dataSharing } = req.body;

  const userId = req.user._id;

  // normalize values
  if (profileVisibility) {
    profileVisibility =
      profileVisibility.charAt(0).toUpperCase() +
      profileVisibility.slice(1).toLowerCase();
  }

  dataSharing = dataSharing === true || dataSharing === "true";

  let setting = await Setting.findOne({ user: userId });

  if (!setting) {
    setting = await Setting.create({
      user: userId,
      profileVisibility,
      dataSharing,
    });
  } else {
    setting.profileVisibility = profileVisibility;
    setting.dataSharing = dataSharing;

    await setting.save();
  }

  res.status(200).json({
    message: "Privacy settings updated successfully",
    setting,
  });
});
