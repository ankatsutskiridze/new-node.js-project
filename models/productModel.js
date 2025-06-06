import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: String, // თუ გინდა GEL ცალკე იყოს, შეგვიძლია ობიექტადაც გავყოთ later
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
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
