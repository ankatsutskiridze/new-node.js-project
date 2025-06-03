import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const newProduct = new Product({
    ...req.body,
    createdAt: new Date().toDateString(),
  });
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ message: "name and price are required!" });
  }
  const existingProduct = await Product.findOne({ name: newProduct.name });
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists!" });
  }
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(product);
});

app.post("/buy/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock < 1) {
    return res.status(400).json({ message: "Product out of stock" });
  }

  product.stock -= 1;
  await product.save();

  res.json(product);
});

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
