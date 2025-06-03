import express from "express";
const productRouter = express.Router();

import {
  getProducts,
  createProduct,
  updateProduct,
  buyProduct,
} from "../controllers/productController.js";

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.post("/:id/buy", buyProduct);

export default productRouter;
