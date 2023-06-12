const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
},{timestamps:true});

module.exports = mongoose.model('Warehouse',warehouseSchema);