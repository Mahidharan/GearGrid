import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to MongoDB");

    console.log(`Products to seed: ${products.length}`);

    // Clear existing products
    await Product.deleteMany({});
    console.log("✓ Existing products deleted");

    // Insert products from data file
    console.log("Inserting products...");
    const result = await Product.insertMany(products);
    console.log(`✓ Successfully seeded ${result.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding products:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

seedProducts();
