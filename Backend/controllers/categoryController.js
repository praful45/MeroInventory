const Category = require("../models/Category");

// getall categories
exports.getAllCategory = async (req, res) => {
  try{
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// create category
exports.createCategory = async (req, res) => {
  try {
    const {name, description } = req.body;
    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error'});
  }
};

