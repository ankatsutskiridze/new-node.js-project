import product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const products = await product.find(req.query);
  res.json(products);
};

const createProduct = async (req, res) => {
  const newProduct = new product({
    ...req.body,
    id: Date.now(),
  });

  await newProduct.save();
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(product);
};

const buyProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await product.findById(productId);

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

export { getProducts, createProduct, updateProduct, buyProduct };
