import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query, queryOne } from "../config/database.js";
import { generateOTP } from "../helpers/otpGenerator.js";
import { sendOTP, sendPasswordResetEmail } from "../services/emailService.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// register user
export const registerUser = async (req, res) => {
  try {
    const { email, password, full_name, phone, user_type = "customer" } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({ message: "Email, password, and full name are required." });
    }

    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    const sent = await sendOTP(full_name, email, otp);
    if (!sent.success) {
      return res.status(500).json({ message: "Failed to send OTP. Please try again.", error: sent.error });
    }

    const signupToken = jwt.sign(
      { full_name, email, password: hashedPassword, phone, user_type, otp },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "OTP sent to your email. Please verify to complete registration.",
      token: signupToken,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// verify user registration (OTP)
export const verifyCustomerOTP = async (req, res) => {
  const { otp, token } = req.body;

  if (!otp || !token) {
    return res.status(400).json({ message: "OTP and token are required." });
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "OTP has expired. Please request a new one." });
      }
      return res.status(401).json({ message: "Invalid or malformed token." });
    }

    if (String(otp) !== String(decoded.otp)) {
      return res.status(400).json({ message: "Invalid OTP. Please check and try again." });
    }

    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [decoded.email]);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const result = await query(
      "INSERT INTO users (email, password, full_name, phone, user_type) VALUES (?, ?, ?, ?, ?)",
      [decoded.email, decoded.password, decoded.full_name, decoded.phone || null, decoded.user_type]
    );

    return res.status(201).json({
      message: "Registration successful. You can now log in.",
      user: {
        id: result.insertId,
        email: decoded.email,
        full_name: decoded.full_name,
        user_type: decoded.user_type,
      },
    });
  } catch (error) {
    console.error("Error in verifyCustomerOTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// STEP 2b: Resend OTP 
export const resendOTP = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    let decoded;
    try {

      decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    } catch (err) {
      return res.status(401).json({ message: "Invalid or malformed token." });
    }

    const { full_name, email, password, phone, user_type } = decoded;

    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(409).json({ message: "This email is already registered. Please log in." });
    }

    const newOtp = generateOTP();
    const sent = await sendOTP(full_name, email, newOtp);
    if (!sent.success) {
      return res.status(500).json({ message: "Failed to resend OTP. Please try again.", error: sent.error });
    }

    const newSignupToken = jwt.sign(
      { full_name, email, password, phone, user_type, otp: newOtp },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "A new OTP has been sent to your email.",
      token: newSignupToken,
    });
  } catch (error) {
    console.error("Error in resendOTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await queryOne("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// FORGOT PASSWORD — sends a password reset OTP to the user's email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await queryOne("SELECT id, full_name, email FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(200).json({ message: "If this email is registered, a reset OTP has been sent." });
    }

    const otp = generateOTP();
    const sent = await sendPasswordResetEmail(user.full_name, user.email, otp);
    if (!sent.success) {
      return res.status(500).json({ message: "Failed to send reset OTP. Please try again.", error: sent.error });
    }

    const resetToken = jwt.sign(
      { userId: user.id, email: user.email, otp },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "If this email is registered, a reset OTP has been sent.",
      token: resetToken,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// RESET PASSWORD — verifies the OTP then updates the password
export const resetPassword = async (req, res) => {
  const { token, otp, newPassword } = req.body;

  if (!token || !otp || !newPassword) {
    return res.status(400).json({ message: "Token, OTP, and new password are required." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Reset token has expired. Please request a new one." });
      }
      return res.status(401).json({ message: "Invalid or malformed token." });
    }

    if (String(otp) !== String(decoded.otp)) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.userId]);

    return res.status(200).json({ message: "Password has been reset successfully. You can now log in." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// GET CURRENT USER (protected)
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await queryOne(
      "SELECT id, email, full_name, phone, profile_image, user_type, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};