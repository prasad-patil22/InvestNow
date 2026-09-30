import express from "express";
import { getFinancialGoalsContent, updateFinancialGoalsContent } from "../controllers/financialGoalController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Financial Goals content for Guest Layout
router.get("/", getFinancialGoalsContent);

// Protected routes to update Financial Goals content for Admin Layout
router.put("/", protectAdmin, updateFinancialGoalsContent);
router.post("/", protectAdmin, updateFinancialGoalsContent);

export default router;
