import express from "express";
import {
  createReminder,
  getUserReminders,
  reorderFromReminder,
  processAutoOrders,
} from "../controllers/reminderController.js";
import { protect, isMechanic } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, isMechanic, createReminder);
router.get("/user/:userId", protect, getUserReminders);
router.post("/reorder", protect, isMechanic, reorderFromReminder);
router.post("/process-auto-orders", protect, processAutoOrders);

export default router;
