const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  warehouse: {
    type: mongoose.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

