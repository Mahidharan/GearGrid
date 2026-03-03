import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      retailPrice,
      mechanicPrice,
      category,
      brand,
      stock,
      image,
      compatibility,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !retailPrice ||
      !mechanicPrice ||
      !category ||
      !brand
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const product = await Product.create({
      name,
      description,
      retailPrice,
      mechanicPrice,
      category,
      brand,
      stock: stock || 0,
      image: image || "https://via.placeholder.com/300",
      compatibility: compatibility || [],
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      description,
      retailPrice,
      mechanicPrice,
      category,
      brand,
      stock,
      image,
      compatibility,
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.retailPrice = retailPrice || product.retailPrice;
    product.mechanicPrice = mechanicPrice || product.mechanicPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.stock = stock !== undefined ? stock : product.stock;
    product.image = image || product.image;
    product.compatibility = compatibility || product.compatibility;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
