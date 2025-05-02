const ProductService = require("../services/product.service.js");
const {dateTimeFormatTH} = require("../utils/dateTimeFormat.js");
exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const offset = parseInt(page) || 1;
  const size = parseInt(limit) || 10;
  try {
    const products = await ProductService.getAllProducts(offset, size);
    if (!products) throw new Error("Products not found");
    if (products.length === 0) throw new Error("No products found");
    products.rows = products.rows.map((product) => {
      product = product.toJSON();
      product.createdAt = dateTimeFormatTH(product.createdAt);
      product.updatedAt = dateTimeFormatTH(product.updatedAt);
      return product;
    });
    products.count = products.count;

    return res.status(200).json({
      total: products.count,
      page: offset,
      limit: size,
      data: products.rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("ID is required");
    let product = await ProductService.getProductById(id);
    product = product.toJSON();
    product.createdAt = dateTimeFormatTH(product.createdAt);
    product.updatedAt = dateTimeFormatTH(product.updatedAt);
    product.deletedAt = dateTimeFormatTH(product.deletedAt);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("Creating product with data:", req.body);
    
    const { name, price, description, quantity } = req.body;
    if (!name || !price || !quantity)
      throw new Error("All fields are required");
    let product = await ProductService.createProduct({
      ProductName: name,
      ProductPrice: price,
      ProductDetail: description,
      productQuantity: quantity,
    });
    if (!product) throw new Error("Product not created");
    product = product.toJSON();
    product.createdAt = dateTimeFormatTH(product.createdAt);
    product.updatedAt = dateTimeFormatTH(product.updatedAt);
    product.deletedAt = dateTimeFormatTH(product.deletedAt);
    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;
    if (!id) throw new Error("ID is required");
    if (!name || !price || !description)
      throw new Error("All fields are required");
    const product = await ProductService.updateProduct(id, {
      name,
      price,
      description,
      quantity,
    });
    if (!product) throw new Error("Product not updated");
    return res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("ID is required");
    const product = await ProductService.deleteProduct(id);
    if (!product) throw new Error("Product not deleted");
    return res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};