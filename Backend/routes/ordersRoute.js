const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Create a new order post request
router.post('/create-order', ordersController.createOrder);
//get all order get request
router.get('/getallorders', ordersController.getAllOrders);
//get order by id get request
router.get('/get-order/:id', ordersController.getOrderById);
// edit the order
router.put('/edit-order/:orderId', ordersController.editOrder);
// update order status by id put request
router.put('/update-status/:id', ordersController.updateStatus);
//delete order by id delete request
router.delete('/delete-order/:id', ordersController.deleteOrderById)

//generate sales report
router.get('/sales-report', ordersController.generateSalesReport);

module.exports = router;
