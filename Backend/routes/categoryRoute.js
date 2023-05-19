const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Get all products
router.get('/', categoryController.getAllCategory);


// Create a new product
router.post('/', categoryController.createCategory);

module.exports = router;