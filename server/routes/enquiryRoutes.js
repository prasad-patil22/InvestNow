import express from "express";
import { createEnquiry, getEnquiries, replyEnquiry } from "../controllers/enquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to submit enquiry from Guest Layout
router.post("/", createEnquiry);

// Protected routes for Admin Layout
router.get("/", protectAdmin, getEnquiries);
router.post("/:id/reply", protectAdmin, replyEnquiry);

export default router;
