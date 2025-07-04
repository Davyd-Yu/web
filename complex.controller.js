const Complex = require('../models/complex.model');

// Create a new complex
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.capacity || !req.body.attendance || !req.body.cost) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const newComplex = {
    name: req.body.name,
    capacity: req.body.capacity,
    attendance: req.body.attendance,
    cost: req.body.cost
  };

  try {
    const data = await Complex.create(newComplex);
    res.status(201).send(data); // 201 Created
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Complex."
    });
  }
};

// Retrieve all complexes
exports.findAll = async (req, res) => {
  try {
    const data = await Complex.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving complexes."
    });
  }
};

// Find a single complex by ID
exports.findOne = async (req, res) => {
  try {
    const data = await Complex.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Not found Complex with id ${req.params.id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Complex with id " + req.params.id
    });
  }
};

// Find a single complex by name (for frontend search function)
exports.findOneByName = async (req, res) => {
  try {
    const name = req.params.name;
    const data = await Complex.findByName(name);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Not found Complex with name ${name}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Complex with name " + name
    });
  }
};

// Update a complex by ID
exports.update = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.capacity || !req.body.attendance || !req.body.cost) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {
    const success = await Complex.updateById(req.params.id, req.body);
    if (success) {
      res.send({ message: "Complex was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update Complex with id ${req.params.id}. Maybe Complex was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Complex with id " + req.params.id
    });
  }
};

// Delete a complex by ID
exports.delete = async (req, res) => {
  try {
    const success = await Complex.remove(req.params.id);
    if (success) {
      res.send({ message: `Complex was deleted successfully!` });
    } else {
      res.status(404).send({
        message: `Cannot delete Complex with id ${req.params.id}. Maybe Complex was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Complex with id " + req.params.id
    });
  }
};
