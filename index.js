import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import express from "express";

const app = express();
app.use(express.json());

const data = fs.readFileSync("./data/products.json", "utf-8");

app.get("/products", (req, res) => {
  const Products = JSON.parse(data);
  res.json(Products);
});

app.post("/products", (req, res) => {
  const products = JSON.parse(data);
  const newProducts = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toDateString(),
  };
  if (!newProducts.name || !newProducts.price) {
    return res.status(400).json({ message: "name and price are required!" });
  }
  const existingProduct = products.find((p) => p.name === newProducts.name);
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists!" });
  }
  products.push(newProducts);
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(201).json(newProducts);
});

app.put("/products/:id", (req, res) => {
  const products = JSON.paramse(data);
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  const newProducts = req.body;
  products[productIndex] = newProducts;
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.json(newProducts);
});

app.post("/buy/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = JSON.parse(data);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (products[productIndex].stock < 1) {
    return res.status(400).json({ message: "Product out of stock" });
  }

  products[productIndex] = {
    ...products[productIndex],
    stock: products[productIndex].stock - 1,
  };

  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.json(products[productIndex]);
});

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
