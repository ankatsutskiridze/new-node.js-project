import mongoose from "mongoose";
import StockHistory from "./stockHistoryModel.js";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (val) => val > 0,
        message: "Price must be greater than 0",
      },
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
    },
    archive: {
      type: Boolean,
      default: false,
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

// Virtual field for availability status
productSchema.virtual("status").get(function () {
  return this.stock > 0 ? "available" : "not available";
});

// Virtual field for discounted price within a week
productSchema.virtual("priceWithinWeek").get(function () {
  return this.price * 0.9; // 10% discount
});

// Pre hook for findOneAndDelete to ensure the product exists
productSchema.pre("findOneAndDelete", async function (next) {
  const deletedProduct = await this.model.findOne(this.getQuery());
  if (!deletedProduct) {
    return next(new Error("Product not found"));
  }
  next();
});

// Static method to find archived products
productSchema.static.archived = async function (filter) {
  return this.find(filter, { archive: true });
};

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.stock !== undefined) {
    const previousStock = this._update.$set
      ? this._update.$set.stock
      : this._update.stock;
    if (previousStock !== undefined) {
      await StockHistory.create({
        productId: this._conditions._id,
        previousStock: previousStock,
        newStock: update.stock,
      });
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

// ✅ One-time update: add archive: false to old products
(async () => {
  try {
    const result = await Product.updateMany(
      { archive: { $exists: false } },
      { archive: false }
    );
    console.log(
      `✅ Archive field added to ${result.modifiedCount} existing products`
    );
  } catch (err) {
    console.error("❌ Error while updating old products:", err);
  }
})();

export default Product;
