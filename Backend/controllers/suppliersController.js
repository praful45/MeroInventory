const Supplier = require("../models/Supplier");

// getall suppliers
exports.getAllSupplier = async (req, res) => {
  try{
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getSupplierById = async (req, res) => {
    try {
      const supplierId = req.params.id;
      const supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
      res.json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


// create Supplier
exports.createSupplier = async (req, res) => {
  const { name, email, address, phone } = req.body;

  try {
    // Check if the Supplier already exists
    const existingSupplier = await Supplier.findOne({ name: { $regex: new RegExp(`^${name}$`,'i')} });

    if (existingSupplier) {
      return res.status(400).json({ error: 'Supplier already exists' });
    }

    const newSupplier = await Supplier.create({ name, email, address, phone });
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update Supplier

exports.updateSupplier = async (req, res ) => {
  const SupplierId = req.params.id;
  const { name, email, address, phone } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      SupplierId,
      { name, email, address, phone },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    res.json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// delete Supplier
exports.deleteSupplier = async (req, res) => {
  const SupplierId = req.params.id;

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(SupplierId);

    if(!deletedSupplier){
      return res.status(404).json({error: 'Supplier not found'});
    }
    res.sendStatus(204);
  }
  
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 
