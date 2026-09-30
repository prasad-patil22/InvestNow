import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPasswordAdmin);
router.get("/profile", protectAdmin, getAdminProfile);

export default router;
