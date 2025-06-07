import product from "../models/productModel.js";
import filterService from "../service/filtrService.js";

const getProducts = async (req, res) => {
  const filteredProducts = filterService(product.find(), req.query);
  const products = await filteredProducts;
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

const getCategorieStats = async (req, res) => {
  const stats = await product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        totalStock: { $sum: "$stock" },
        averagePrice: { $avg: "$price" },
      },
    },
    { sort: { totalProducts: -1 } },
  ]);

  res.json(stats);
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.archived({
      id: parseInt(req.params.id),
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProducts,
  createProduct,
  updateProduct,
  buyProduct,
  getCategorieStats,
  deleteProduct,
};
