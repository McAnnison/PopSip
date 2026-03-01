import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export async function sendOTP(name, email, otp) {
  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; }
      .container { max-width: 500px; margin: auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .otp-box { background-color: #e8f5e8; padding: 14px 20px; font-size: 28px; font-weight: bold; letter-spacing: 6px; width: fit-content; border-radius: 6px; margin: 16px 0; }
      .footer { font-size: 12px; color: #888; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome to PopSip, ${name}!</h2>
      <p>Use the OTP below to complete your registration. It is valid for <strong>10 minutes</strong>.</p>
      <div class="otp-box">${otp}</div>
      <p><strong>Do not share this code with anyone.</strong></p>
      <p class="footer">If you did not request this, please ignore this email.</p>
    </div>
  </body>
  </html>
`;

  const mailOptions = {
    from: `"PopSip" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your PopSip Verification OTP",
    html: emailTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("sendOTP error:", error.message);
    return { success: false, error: error.message };
  }
}


export async function sendPasswordResetEmail(name, email, otp) {
  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; }
      .container { max-width: 500px; margin: auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .otp-box { background-color: #fef3cd; padding: 14px 20px; font-size: 28px; font-weight: bold; letter-spacing: 6px; width: fit-content; border-radius: 6px; margin: 16px 0; }
      .footer { font-size: 12px; color: #888; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Password Reset Request</h2>
      <p>Hi ${name}, use the OTP below to reset your PopSip password. It is valid for <strong>10 minutes</strong>.</p>
      <div class="otp-box">${otp}</div>
      <p><strong>Do not share this code with anyone.</strong></p>
      <p class="footer">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
    </div>
  </body>
  </html>
`;

  const mailOptions = {
    from: `"PopSip" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your PopSip Password Reset OTP",
    html: emailTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("sendPasswordResetEmail error:", error.message);
    return { success: false, error: error.message };
  }
}