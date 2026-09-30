import express from "express";
import { getChalukyaContent, updateChalukyaContent } from "../controllers/chalukyaController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Chalukya Developers content for Guest Layout
router.get("/", getChalukyaContent);

// Protected routes to update Chalukya Developers content for Admin Layout
router.put("/", protectAdmin, updateChalukyaContent);
router.post("/", protectAdmin, updateChalukyaContent);

export default router;
