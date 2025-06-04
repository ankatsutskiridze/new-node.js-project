import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import Product from "./models/productModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import productsRouter from "./routes/prodactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productsRouter);
app.use("/users", usersRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
