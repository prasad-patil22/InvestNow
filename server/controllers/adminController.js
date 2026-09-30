import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Admin from "../models/adminModel.js";

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "investnow_secret_key_12345",
    {
      expiresIn: "7d",
    }
  );
};

// @desc    Register a new Admin
// @route   POST /api/admin/register
// @access  Public
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const adminExists = await Admin.findOne({ email: email.toLowerCase() });
    if (adminExists) {
      return res
        .status(400)
        .json({ success: false, message: "Admin with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if (admin) {
      const token = generateToken(admin._id);
      return res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid admin data" });
    }
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// @desc    Authenticate Admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter email and password" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// @desc    Forgot Password - Send random password to admin email
// @route   POST /api/admin/forgot-password
// @access  Public
export const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide admin email address" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "No admin account found with this email address" });
    }

    // Generate a random 8-character string password
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@!";
    let randomPassword = "";
    for (let i = 0; i < 10; i++) {
      randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Hash the random password and update DB
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(randomPassword, salt);
    await admin.save();

    // Nodemailer configuration
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return res.status(500).json({
        success: false,
        message: "Email configuration (EMAIL_USER / EMAIL_PASS) is missing in server .env",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"InvestNow Admin Portal" <${emailUser}>`,
      to: admin.email,
      subject: "InvestNow Admin Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #1a2a6c; text-align: center;">InvestNow Admin Password Reset</h2>
          <p>Hello <strong>${admin.name}</strong>,</p>
          <p>You requested a password reset for your admin account.</p>
          <p>Your new temporary password is:</p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="font-size: 22px; font-weight: bold; background: #eef2ff; color: #1a2a6c; padding: 12px 24px; border-radius: 6px; letter-spacing: 2px; border: 1px dashed #4f46e5;">
              ${randomPassword}
            </span>
          </div>
          <p>Please use this password to log in at <a href="http://localhost:3000/investnowlogin">InvestNow Login</a>.</p>
          <p style="color: #666; font-size: 13px; margin-top: 30px;">If you did not request this change, please contact support immediately.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: `A new temporary password has been sent to ${admin.email}`,
    });
  } catch (error) {
    console.error("Error in forgotPasswordAdmin:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Failed to send email" });
  }
};

// @desc    Get Admin profile (verify token)
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};
