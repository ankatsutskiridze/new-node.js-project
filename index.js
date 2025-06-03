import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import Product from "./models/productModel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(product);
};

const buyProduct = async (req, res) => {
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
};

app.get("/api/products", getProducts);
app.post("/api/products", createProduct);
app.put("/api/products/:id", updateProduct);
app.post("/api/products/:id/buy", buyProduct);

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
