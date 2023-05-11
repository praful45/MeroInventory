const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
//   product_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  added_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);