import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is Required!"],
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

productSchema.virtual("status").get(function () {
  return this.stock > 0 ? "available" : "not available";
});

productSchema.virtual("priceWithinWeek").get(function () {
  return this.price * 0.9; // Assuming a 10% discount within a week
});

productSchema.pre("findOneAndDelete", async function (next) {
  const deletedProduct = await this.model.findOne(this.getQuery());
  if (!deletedProduct) {
    return next(new Error("Product not found"));
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
