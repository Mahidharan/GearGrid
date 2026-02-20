import mongoose from "mongoose";

const restockReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  intervalDays: {
    type: Number,
    required: true,
    min: 1,
  },
  nextReminderDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  autoOrder: {
    type: Boolean,
    default: false,
  },
  lastAutoOrderDate: {
    type: Date,
  },
});

const RestockReminder = mongoose.model(
  "RestockReminder",
  restockReminderSchema,
);

export default RestockReminder;
