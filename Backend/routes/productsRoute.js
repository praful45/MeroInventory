const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middleware/upload');

// Create a new product post request
router.post('/create-product', upload.single('image'), productsController.createProduct);
//get all product get request
router.get('/getallproducts', productsController.getAllProducts);
//get product by id get request
router.get('/getproduct/:id', productsController.getProductById);

module.exports = router;
