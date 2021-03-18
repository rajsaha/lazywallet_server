import mongoose from "mongoose";
let ExpenseTypeSchema = new mongoose.Schema({
  typeId: {
    type: Number,
    required: true,
  },
  typeDesc: {
    type: String,
    required: true,
  },
});

let ExpenseType = mongoose.model("ExpenseType", ExpenseTypeSchema);
export { ExpenseType };
