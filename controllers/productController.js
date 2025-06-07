import product from "../models/productModel.js";
import filterService from "../service/filtrService.js";

const getProducts = async (req, res) => {
  const filteredProducts = filterService(
    product.find({ archived: false }),
    req.query
  );
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

const getPriceStatistics = async (req, res) => {
  try {
    const PriceRange = await product.aggregate;
    [
      $bucket({
        groupBy: "$price",
        boundaries: [0, 50, 100, 200, 300],
        default: "Other",
        output: {
          count: { $sum: 1 },
          max: { $max: "$price" },
          min: { $min: "$price" },
          avg: { $avg: "$price" },
        },
      }),
      $addFields({
        range: {
          $switch: {
            branches: [
              { case: { $lt: ["$price", 50] }, then: "0-50" },
              { case: { $lt: ["$price", 100] }, then: "50-100" },
              { case: { $lt: ["$price", 200] }, then: "100-200" },
              { case: { $lt: ["$price", 300] }, then: "200-300" },
            ],
            default: "Other", ////300+
          },
        },
      }),
    ];
    res.json(PriceRange);
  } catch (error) {
    console.error("Error fetching price statistics:", error);
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
  getPriceStatistics,
};
