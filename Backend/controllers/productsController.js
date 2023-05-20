const Product = require('../models/Product');
const Category = require('../models/Category')

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, categoryName, price, quantity } = req.body;
    const { filename } = req.file;
    // Find category by it's name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {  
      return res.status(404).json({ message: 'Category not found' });
    }

    const newProduct = new Product({
      name,
      description,
      category: category._id, // Link category ID to the product
      price,
      quantity,
      image: filename,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

//get product by id
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
