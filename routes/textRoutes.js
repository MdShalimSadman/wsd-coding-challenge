const express = require('express');
const { createText, analyzeTextById, updateText, deleteText } = require('../controllers/textController');
const router = express.Router();

// Route to create a new text entry
router.post('/texts', createText);

// Route to analyze text by ID
router.get('/texts/:id', analyzeTextById);

// Route to update an existing text entry
router.put('/texts/:id', updateText);

// Route to delete a text entry
router.delete('/texts/:id', deleteText);

module.exports = router;
