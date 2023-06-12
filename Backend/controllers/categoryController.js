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
  const { name, description } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`,'i')} });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update category

exports.updateCategory = async (req, res ) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Product category not found' });
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// delete category
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if(!deletedCategory){
      return res.status(404).json({error: 'Category not found'});
    }
    res.sendStatus(204);
  }
  
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 
