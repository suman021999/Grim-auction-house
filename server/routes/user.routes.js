import {Router} from 'express';
import {googleLogin,  loginAccount, registerAccount } from '../controllers/user.controller.js';

// admin, googleLogin, loginAccount, logout,

const router = Router();

// Google Login route
router.post("/google", googleLogin);

// Register route
router.route("/register").post( registerAccount);

// Login route
router.route("/login").post( loginAccount );

// Admin route
// router.route("/admin").post( admin );

// Logout route
// router.route("/admin").post( logout );

export default router;