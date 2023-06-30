const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    categories: [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
            },
            products: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    warehouseEmail: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
    order_date: {
        type: Date,
        default: Date.now,
    },
    delivery_date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered'],
        default: 'Pending',
    },
});

orderSchema.pre('save', async function (next) {
    try {
        const products = [];

        for (const categoryData of this.categories) {
            const categoryName = categoryData.category;
            const productQuantities = await mongoose
                .model('Product')
                .find({
                    _id: { $in: categoryData.products.map((p) => p.product) },
                    category: categoryName
                })
                .select('_id quantity');

            const quantityMap = new Map();
            for (const { _id, quantity } of productQuantities) {
                quantityMap.set(_id.toString(), quantity);
            }

            for (const { product, quantity } of categoryData.products) {
                if (quantity > quantityMap.get(product.toString())) {
                    throw new Error(`Requested quantity for product '${product}' exceeds available stock`);
                }

                products.push({
                    category: categoryName,
                    product: product,
                    quantity: quantity,
                });
            }
        }

        this.products = products;
        next();
    } catch (err) {
        next(err);
    }
});

orderSchema.post('findOneAndUpdate', async function (doc) {
    if (doc.status === 'Delivered') {
        try {
            for (const categoryData of doc.categories) {
                for (const { product, quantity } of categoryData.products) {
                    await mongoose.model('Product').updateOne(
                        { _id: product },
                        { $inc: { quantity: -quantity } }
                    );
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);