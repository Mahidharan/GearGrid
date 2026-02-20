import RestockReminder from "../models/RestockReminder.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new restock reminder
// @route   POST /api/reminders
// @access  Private (Mechanics only)
export const createReminder = async (req, res) => {
  try {
    const { productId, quantity, intervalDays, autoOrder } = req.body;

    // Validate input
    if (!productId || !quantity || !intervalDays) {
      return res.status(400).json({
        message: "Please provide productId, quantity, and intervalDays",
      });
    }

    // Check if user is a mechanic
    if (req.user.role !== "mechanic") {
      return res
        .status(403)
        .json({ message: "Only mechanics can create restock reminders" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate next reminder date
    const nextReminderDate = new Date();
    nextReminderDate.setDate(nextReminderDate.getDate() + intervalDays);

    // Create reminder
    const reminder = await RestockReminder.create({
      userId: req.user._id,
      productId,
      quantity,
      intervalDays,
      nextReminderDate,
      autoOrder: autoOrder || false,
    });

    const populatedReminder = await RestockReminder.findById(
      reminder._id,
    ).populate("productId");

    res.status(201).json(populatedReminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reminders for a specific user
// @route   GET /api/reminders/user/:userId
// @access  Private
export const getUserReminders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user is accessing their own reminders
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const reminders = await RestockReminder.find({ userId, isActive: true })
      .populate("productId")
      .sort({ nextReminderDate: 1 });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reorder from reminder
// @route   POST /api/reminders/reorder
// @access  Private (Mechanics only)
export const reorderFromReminder = async (req, res) => {
  try {
    const { reminderId } = req.body;

    // Validate input
    if (!reminderId) {
      return res.status(400).json({ message: "Please provide reminderId" });
    }

    // Check if user is a mechanic
    if (req.user.role !== "mechanic") {
      return res
        .status(403)
        .json({ message: "Only mechanics can reorder from reminders" });
    }

    // Find the reminder
    const reminder =
      await RestockReminder.findById(reminderId).populate("productId");

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Check if reminder belongs to the user
    if (reminder.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if reminder is active
    if (!reminder.isActive) {
      return res.status(400).json({ message: "Reminder is not active" });
    }

    // Check product stock
    const product = await Product.findById(reminder.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < reminder.quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Create new order with orderType = "reminder"
    const order = await Order.create({
      userId: req.user._id,
      productId: reminder.productId,
      quantity: reminder.quantity,
      orderType: "reminder",
    });

    // Update product stock
    product.stock -= reminder.quantity;
    await product.save();

    // Update nextReminderDate
    const newNextReminderDate = new Date(reminder.nextReminderDate);
    newNextReminderDate.setDate(
      newNextReminderDate.getDate() + reminder.intervalDays,
    );
    reminder.nextReminderDate = newNextReminderDate;
    await reminder.save();

    // Populate order details
    const populatedOrder = await Order.findById(order._id).populate(
      "productId",
    );

    res.status(201).json({
      message: "Order created successfully from reminder",
      order: populatedOrder,
      nextReminderDate: reminder.nextReminderDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process automatic orders for due reminders
// @route   POST /api/reminders/process-auto-orders
// @access  Private (System/Admin)
export const processAutoOrders = async (req, res) => {
  try {
    const now = new Date();

    // Find all active reminders with autoOrder enabled that are due
    const dueReminders = await RestockReminder.find({
      isActive: true,
      autoOrder: true,
      nextReminderDate: { $lte: now },
    }).populate("productId userId");

    const results = {
      processed: 0,
      failed: 0,
      orders: [],
      errors: [],
    };

    for (const reminder of dueReminders) {
      try {
        // Check product stock
        const product = await Product.findById(reminder.productId);

        if (!product) {
          results.errors.push({
            reminderId: reminder._id,
            error: "Product not found",
          });
          results.failed++;
          continue;
        }

        if (product.stock < reminder.quantity) {
          results.errors.push({
            reminderId: reminder._id,
            productName: product.name,
            error: `Insufficient stock (Available: ${product.stock}, Required: ${reminder.quantity})`,
          });
          results.failed++;
          continue;
        }

        // Create automatic order
        const order = await Order.create({
          userId: reminder.userId,
          productId: reminder.productId,
          quantity: reminder.quantity,
          orderType: "reminder",
        });

        // Update product stock
        product.stock -= reminder.quantity;
        await product.save();

        // Update reminder dates
        const newNextReminderDate = new Date(reminder.nextReminderDate);
        newNextReminderDate.setDate(
          newNextReminderDate.getDate() + reminder.intervalDays,
        );
        reminder.nextReminderDate = newNextReminderDate;
        reminder.lastAutoOrderDate = now;
        await reminder.save();

        const populatedOrder = await Order.findById(order._id).populate(
          "productId",
        );

        results.orders.push({
          orderId: order._id,
          productName: product.name,
          quantity: reminder.quantity,
          userId: reminder.userId,
          nextOrderDate: reminder.nextReminderDate,
        });
        results.processed++;
      } catch (err) {
        results.errors.push({
          reminderId: reminder._id,
          error: err.message,
        });
        results.failed++;
      }
    }

    res.json({
      message: `Processed ${results.processed} automatic orders`,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
