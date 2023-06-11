const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    delivery_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered'],
        default: 'Pending'
    },
});

orderSchema.pre('save', async function (next) {
    try {
        const product = await mongoose.model('Product').findById(this.product_id);
        if (this.quantity > product.quantity) {
            throw new Error('Requested quantity exceeds available stock');
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Order', orderSchema);