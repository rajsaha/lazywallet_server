import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseType",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateCreatedAt: {
    type: Date,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export { Expense };
