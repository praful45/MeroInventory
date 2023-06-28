const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/suppliersController');

// Get all suppliers
router.get('/getallsuppliers', supplierController.getAllSupplier);

//Get supplier By Id
router.get('/getsupplier/:id', supplierController.getSupplierById);

// Create a new supplier
router.post('/create-supplier', supplierController.createSupplier);

// update supplier
router.put('/update-supplier/:id', supplierController.updateSupplier);

// delete supplier
router.delete('/delete-supplier/:id', supplierController.deleteSupplier);


module.exports = router;