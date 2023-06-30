const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Customer = require('../models/Customer');
const Warehouse = require('../models/Warehouse');
const transporter = require('../middleware/mailAuth');
const emailTemplate = require('../utils/emailTemplate');

exports.createOrder = async (req, res) => {
    try {
        const { customerName, categories, deliveryDate } = req.body;

        // Check if the customer exists
        const customer = await Customer.findOne({ name: customerName });
        // { console.log(customer) }
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const orderCategories = [];
        const warehouseEmails = new Set(); //Warehouse Emails Set

        for (const categoryData of categories) {
            const categoryName = categoryData.categoryName;

            // Find category by its name
            const category = await Category.findOne({ name: categoryName });

            if (!category) {
                return res.status(404).json({ message: `Category '${categoryName}' not found` });
            }

            const products = [];

            for (const productData of categoryData.products) {
                const productName = productData.productName;
                const quantity = productData.quantity;


                // Find the product linked to the category by its name
                const product = await Product.findOne({ name: productName, category: category._id }).populate('warehouse', 'email');;

                if (!product) {
                    return res.status(404).json({ message: `Product '${productName}' not found or not linked to category '${categoryName}'` });
                }
                if (!product.warehouse) {
                    console.log("No Warehouse")
                }

                if (quantity > product.quantity) {
                    return res.status(400).json({ message: `Requested quantity for product '${productName}' exceeds available stock` });
                }

                products.push({
                    product: product._id,
                    quantity: quantity,
                    warehouseEmail: product.warehouse.email
                });
                //add warehouse emails
                for (mails of products) {
                    warehouseEmails.add(mails.warehouseEmail)
                    console.log(mails.warehouseEmail)
                }
            }

            orderCategories.push({
                category: category._id,
                products: products
            });
        }

        const newOrder = new Order({
            customer: customer._id,
            categories: orderCategories,
            delivery_date: deliveryDate,
        });

        const savedOrder = await newOrder.save();

        // Convert set to an array
        const warehouseEmailsArray = Array.from(warehouseEmails);
        console.log('WE - ' + warehouseEmailsArray)

        // console.log(warehouseEmails);
        // Generate email content
        const emailContent = await emailTemplate(savedOrder, customer);

        for (mail of warehouseEmailsArray) {// Send the email
            const mailOptions = {
                from: process.env.EMAIL,
                to: mail,
                subject: 'New Order Placed',
                html: emailContent
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending email' });
                }
                console.log('Email sent:', info.response);
                res.status(201).json({
                    success: true,
                    order: savedOrder
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('categories.category').populate('customer');

        res.status(200).json({
            success: true,
            orders: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//get order by id
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('categories.category', 'name').populate('customer');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//update order by id

exports.editOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { customerName, categories, delivery_date, status } = req.body;

        // Check if the customer exists
        const customer = await Customer.findOne({ name: customerName });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Find the order by its ID
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (categories) {
            const orderCategories = [];

            for (const categoryData of categories) {
                const categoryName = categoryData.categoryName;

                // Find category by its name
                const category = await Category.findOne({ name: categoryName });

                if (!category) {
                    return res.status(404).json({ message: `Category '${categoryName}' not found` });
                }

                const products = [];

                for (const productData of categoryData.products) {
                    const productName = productData.productName;
                    const quantity = productData.quantity;

                    // Find the product linked to the category by its name
                    const product = await Product.findOne({ name: productName, category: category._id });

                    if (!product) {
                        return res
                            .status(404)
                            .json({ message: `Product '${productName}' not found or not linked to category '${categoryName}'` });
                    }

                    if (quantity > product.quantity) {
                        return res
                            .status(400)
                            .json({ message: `Requested quantity for product '${productName}' exceeds available stock` });
                    }

                    products.push({
                        product: product._id,
                        quantity: quantity,
                    });
                }

                orderCategories.push({
                    category: category._id,
                    products: products,
                });
            }

            // Update the order categories
            order.categories = orderCategories;
        }

        // Update the customer ID if provided
        if (customer) {
            order.customer = customer._id;
        }

        // Update the delivery date if provided
        if (delivery_date) {
            order.delivery_date = delivery_date;
        }

        // Update the status if provided
        if (status) {
            order.status = status;
        }

        // Save the updated order
        order = await order.save();
        res.json({
            success: true,
            order: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};




//update order by id
exports.updateStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            { status: status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            order: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//delete order by id
exports.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};








//sales
exports.generateSalesReport = async (req, res) => {
    try {
        // Get all orders with status "Delivered"
        const orders = await Order.find({ status: 'Delivered' })
            .populate('categories.category', 'name')
            .populate('categories.products.product', 'name price');

        // Initialize the sales report object
        const salesReport = [];

        // Iterate through each order
        for (const order of orders) {
            // Iterate through each category in the order
            for (const categoryData of order.categories) {
                const categoryName = categoryData.category.name;
                if (!categoryName) {
                    continue; // Skip this category if it is invalid or does not have a name
                }

                // Find the category entry in the sales report
                let categoryEntry = salesReport.find((entry) => entry.category === categoryName);

                if (!categoryEntry) {
                    // If the category entry doesn't exist, create a new entry
                    categoryEntry = {
                        category: categoryName,
                        totalSales: 0,
                        products: [],
                    };
                    salesReport.push(categoryEntry);
                }

                // Iterate through each product in the category
                for (const { product, quantity } of categoryData.products) {
                    const productName = product.name;
                    const productPrice = product.price;

                    // Find the product entry in the category
                    let productEntry = categoryEntry.products.find((entry) => entry.product === productName);

                    if (!productEntry) {
                        // If the product entry doesn't exist, create a new entry
                        productEntry = {
                            product: productName,
                            totalQuantity: 0,
                            totalSales: 0,
                        };
                        categoryEntry.products.push(productEntry);
                    }

                    // Handle missing products
                    if (!product) {
                        continue; // Skip this product if it is not found in the product database
                    }

                    // Update the total sales and quantity for the product and category
                    productEntry.totalQuantity += quantity;
                    productEntry.totalSales += quantity * productPrice;
                    categoryEntry.totalSales += quantity * productPrice;
                }
            }
        }
        res.status(200).json({
            success: true,
            salesReport: salesReport,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

