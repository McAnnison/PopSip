import express from "express";
import {
  registerUser,
  verifyCustomerOTP,
  resendOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

 
router.post("/register", registerUser);          
router.post("/verify-otp", verifyCustomerOTP);
router.post("/resend-otp", resendOTP);           

router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password", resetPassword);   

router.get("/me", authenticateToken, getCurrentUser);

export default router;
