const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const upload = require('../middleware/upload');
const multer = require('multer');

// Create a new customer post request
router.post('/create-customer', customerController.createcustomer);
//get all customer get request
router.get('/getallcustomer', customerController.getAllcustomer);
//get customer by id get request
router.get('/getcustomer/:id', customerController.getcustomerById);
//update customer by id put request
router.put('/updatecustomer/:id',customerController.updatecustomerById);
//delete customer by id delete request
router.delete('/deletecustomer/:id',customerController.deletecustomerById)

const uploadMulter = multer();
router.use(express.json(), uploadMulter.none());

module.exports = router;
