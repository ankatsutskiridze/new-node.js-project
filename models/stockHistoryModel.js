import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the product
      required: true,
    },
    changeAmount: {
      type: Number,
      required: true, // positive or negative change
    },
    previousStock: {
      type: Number,
      required: true,
    },
    newStock: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      enum: ["sale", "restock", "return", "manual", "correction"],
      default: "manual",
    },
    note: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const StockHistory = mongoose.model("StockHistory", stockHistorySchema);

export default StockHistory;
