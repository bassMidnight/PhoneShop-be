const { Product } = require('../models'); // Assuming you have a Product model defined in models directory
const { Op } = require('sequelize');
exports.getAllProducts = (offset, size) => {
  return Product.findAndCountAll({ offset, limit: size });
};

exports.getProductById = (id) => {
  return Product.findByPk(id);
};

exports.createProduct = (productData) => {
    console.log("Creating product with data:", productData);
    
  return Product.create(productData);
};

exports.updateProduct = (id, productData) => {
  return Product.update(productData, { where: { id } });
};

exports.deleteProduct = (id) => {
  return Product.destroy({ where: { id } });
};