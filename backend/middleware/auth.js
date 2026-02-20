import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header (for API testing)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check if user is a mechanic
export const isMechanic = (req, res, next) => {
  if (req.user && req.user.role === "mechanic") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Mechanic role required." });
  }
};

// Middleware to check if user is a customer
export const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "customer") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Customer role required." });
  }
};
