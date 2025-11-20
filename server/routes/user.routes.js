import {Router} from 'express';
import {admin, googleLogin,  loginAccount, logout, registerAccount } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

// admin, googleLogin, loginAccount, logout,

const router = Router();

// Google Login route
router.post("/google", googleLogin);

// Register route
router.route("/register").post( registerAccount);

// Login route
router.route("/login").post( loginAccount );

// Admin route

router.route("/admin").get(protect, admin);

// Logout route
router.route("/logout").post(protect, logout);


export default router;