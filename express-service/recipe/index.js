const express = require('express');
const router = express.Router();

const getRecipe = require('./getRecipe');
const createRecipe = require('./createRecipe');
const updateRecipe = require('./updateRecipe');
const deleteRecipe = require('./deleteRecipe');

router.get('/', getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;