import express from "express";
const productRouter = express.Router();

import {
  getProducts,
  createProduct,
  updateProduct,
  buyProduct,
  getCategorieStats,
  getPriceStatistics,
} from "../controllers/productController.js";

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.post("/:id/buy", buyProduct);
productRouter.get("/categories-stats", getCategorieStats);
productRouter.get("/price-stats", getPriceStatistics);

export default productRouter;
