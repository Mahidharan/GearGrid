import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@geargrid.com" });

    if (adminExists) {
      console.log("✓ Admin user already exists");
      console.log("\nAdmin Credentials:");
      console.log("Email: admin@geargrid.com");
      console.log("Password: admin123");
      process.exit(0);
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@geargrid.com",
      password: "admin123",
      role: "admin",
      isVerified: true,
    });

   

    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating admin user:", error.message);
    process.exit(1);
  }
};

seedAdmin();
