const Product = require('../models/Product');

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, quantity } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image,
    });

    const savedProduct = await newProduct.save();
  } catch (error) {
    console.error(error);
  }
};