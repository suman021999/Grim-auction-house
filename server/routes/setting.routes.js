//setting.routes.js

import express from "express";
import {
  getSettings,
  updatePassword,
  updatePrivacy,
} from "../controllers/setting.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/get").get( authMiddleware, getSettings);

router.route("/password").put( authMiddleware, updatePassword);

router.route("/privacy").put( authMiddleware, updatePrivacy);

export default router;