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

export { getProducts, createProduct, updateProduct, buyProduct };
