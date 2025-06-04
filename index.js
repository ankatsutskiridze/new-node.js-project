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
import logger from "./middlewares/logger.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
