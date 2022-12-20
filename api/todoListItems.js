const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/todoListItems')

// add routes
// Index /api/todoListItems
router.get('/', dataController.index, apiController.index)
// Delete /api/todoListItems/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/todoListItems/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/todoListItems
router.post('/', dataController.create, apiController.show)
// Show /api/todoListItems/:id
router.get('/:id', dataController.show, apiController.show)


module.exports = router