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
prodactSchema.pre();

const Product = mongoose.model("Product", productSchema);
export default Product;
