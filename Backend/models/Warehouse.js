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
    email: {
        type: String,
        required: true
    },
},{timestamps:true});

module.exports = mongoose.model('Warehouse',warehouseSchema);