import express from "express";
import {
  getAllUsers,
  deleteUser,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(isAdmin);

// User management routes
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Product management routes
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
