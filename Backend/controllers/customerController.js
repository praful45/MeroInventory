const customer = require('../models/customer');

// Create a new customer
exports.createcustomer = async (req, res) => {
  try {
    const { name, address,email, phone} = req.body;

    

    const newcustomer = new customer({
      name,
      address,
      email,
      phone,
    });

    const savedcustomer = await newcustomer.save();

    res.status(201).json({
      success: true,
      customer: savedcustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
{/*
//get all customer
exports.getAllcustomer = async (req, res) => {
  try {
    const customer = await customer.find().populate('category');
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch customer.' });
  }
};

//get customer by id
exports.getcustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customer.findById(customerId).populate('category');
    if (!customer) {
      return res.status(404).json({ message: 'customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

{/*
//update product by id
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const { name, description, categoryName, price, quantity } = req.body;

    const updatedFields = {
      name: name || undefined,
      description: description || undefined,
      price: price || undefined,
      quantity: quantity || undefined,
    };

    if (categoryName) {
      const existingCategory = await Category.findOne({ name: categoryName });
      if (!existingCategory) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      updatedFields.category = existingCategory._id;
    }

    if (req.file && req.file.filename) {
      updatedFields.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//delete customer by id
exports.deletecustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedcustomer = await customer.findByIdAndRemove(customerId);

    if (!deletedcustomer) {
      return res.status(404).json({ message: 'customer not found' });
    }

    res.status(200).json({
      success: true,
      customer: deletedcustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

*/}




