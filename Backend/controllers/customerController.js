const Customer = require('../models/Customer');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
        });

        const savedCustomer = await newCustomer.save();

        res.status(201).json({
            success: true,
            customer: savedCustomer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch customers.' });
    }
};

//get customer by id
exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//update customer by id
exports.updateCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try {
        const { name, email, phone, address } = req.body;

        const updatedFields = {
            name: name || undefined,
            email: email || undefined,
            phone: phone || undefined,
            address: address || undefined,

        };

        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            success: true,
            customer: updatedCustomer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//delete customer by id
exports.deleteCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await Customer.findByIdAndRemove(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            success: true,
            customer: deletedCustomer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
