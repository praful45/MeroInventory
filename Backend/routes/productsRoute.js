const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

// Create a new product
router.post('/products', productController.createProduct);

// Get all products
// router.get('/products', productController.getAllProducts);

module.exports = router;