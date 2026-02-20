import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity, orderType } = req.body;

    // Validate input
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Please provide productId and quantity" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      productId,
      quantity,
      orderType: orderType || "manual",
    });

    // Update product stock
    product.stock -= quantity;
    await product.save();

    // Populate product details
    const populatedOrder = await Order.findById(order._id).populate(
      "productId",
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders for a specific user
// @route   GET /api/orders/user/:userId
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user is accessing their own orders
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find({ userId })
      .populate("productId")
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
