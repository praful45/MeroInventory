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
