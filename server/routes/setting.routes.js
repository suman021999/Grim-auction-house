//setting.routes.js

import express from "express";
import {
  getSettings,
  updatePassword,
  updatePrivacy,
} from "../controllers/setting.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get user settings
router.route("/get").get( authMiddleware, getSettings);

// Update password
router.route("/password").put( authMiddleware, updatePassword);

// Update privacy settings
router.route("/privacy").put( authMiddleware, updatePrivacy);

export default router;