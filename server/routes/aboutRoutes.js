import express from "express";
import { getAboutContent, updateAboutContent } from "../controllers/aboutController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch About Us content for Guest Layout
router.get("/", getAboutContent);

// Protected routes to update About Us content for Admin Layout
router.put("/", protectAdmin, updateAboutContent);
router.post("/", protectAdmin, updateAboutContent);

export default router;
