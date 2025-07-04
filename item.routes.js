const express = require('express');
const router = express.Router();
const complexController = require('../controllers/complex.controller');

// Create a new complex
router.post('/', complexController.create);

// Retrieve all complexes
router.get('/', complexController.findAll);

// Retrieve a single complex by ID
router.get('/:id', complexController.findOne);

// Retrieve a single complex by name (for search)
router.get('/name/:name', complexController.findOneByName);

// Update a complex by ID
router.put('/:id', complexController.update);

// Delete a complex by ID
router.delete('/:id', complexController.delete);

module.exports = router;
