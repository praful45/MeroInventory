const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Get all products
router.get('/getallcategories', categoryController.getAllCategory);


// Create a new product
router.post('/create-category', categoryController.createCategory);

module.exports = router;