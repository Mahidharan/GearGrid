import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

dotenv.config();

const clearOrders = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear all orders
    const result = await Order.deleteMany({});
    console.log(`✓ Successfully deleted ${result.deletedCount} orders`);

    process.exit(0);
  } catch (error) {
    console.error("✗ Error clearing orders:", error.message);
    process.exit(1);
  }
};

clearOrders();
