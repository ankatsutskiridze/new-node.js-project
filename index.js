import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import express from "express";

const app = express();
app.use(express.json());

const data = fs.readFileSync("./data/products.json", "utf-8");

app.get("/products", (req, res) => {
  res.json(JSON.parse(data));
});

app.post("/products", (req, res) => {
  const products = JSON.parse(data);
  const newProducts = { ...req.body, id: Date.now() };
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

// 1. დაუმატეთ ახალი ველი ყველა პროდუქტს – სახელად stock(აღნიშნავს პროდუქტის რაოდენობას მაგ. { "stock": 10 }).
// შექმენით როუტი POST /buy/:id, რომელზე რექვესთის გაგზავნის შემდეგ მოცემული პროდუქტის stock 1-ით შემცირდება

app.post("/buy/:id"),
  (req, res) => {
    const productId = parseInt(req.params.id);
    const products = JSON.parse(data);
    const productIndex = products.findIndex((p) => p.id === productId);
    products[productIndex] = {
      ...products[productIndex],
      stock: products[productIndex].stock - 1,
    };
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.json(products[productIndex]);
  };

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
