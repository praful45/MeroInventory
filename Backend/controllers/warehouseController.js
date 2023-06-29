const Warehouse = require("../models/Warehouse");

// getall warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// create warehouse

exports.createWarehouse = async (req, res) => {
  const { name, address, capacity, email } = req.body;

  try {
    const existingWarehouse = await Warehouse.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingWarehouse) {
      return res.status(400).json({ error: "Warehouse already exists" });
    }

    const warehouse = await Warehouse.create({
      name,
      address,
      capacity,
      email,
    });
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get a warehouse by id

exports.getWarehouseById = async (req, res) => {
  const warehouseId = req.params.id;
  try {
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      res.status(404).json({ error: "Warehouse not found" });
    }
    res.status(200).json(warehouse);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update warehouse by id

exports.updateWarehouseById = async (req, res) => {
  const warehouseId = req.params.id;
  const { name, address, capacity, email } = req.body;
  try {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      warehouseId,
      {
        name,
        address,
        capacity,
        email,
      },
      { new: true }
    );
    if (!updatedWarehouse) {
      res.status(404).json({ error: "warehouse not found" });
    }

    res.status(200).json(updatedWarehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a warehouse by id

exports.deleteWarehouseById = async (req, res) => {
  const warehouseId = req.params.id;
  try {
    const deletedWarehouse = await Warehouse.findByIdAndDelete(warehouseId);

    if (!deletedWarehouse) {
      res.status(404).json({ error: "warehouse not found" });
    }
    res.status(200).json({ message: "warehouse deleted"});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
