const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');

// Get all warehouses
router.get('/getallwarehouses',warehouseController.getAllWarehouses);

// get warehouse by id
router.get('/getwarehousebyid',warehouseController.getWarehouseById);

// create new warehouse
router.post('/create-warehouse',warehouseController.createWarehouse);

// update warehouse by id
router.put('/update-warehouse/:id',warehouseController.updateWarehouseById);

// delete warehouse by id
router.delete('/delete-warehouse/:id',warehouseController.deleteWarehouseById);

module.exports = router;