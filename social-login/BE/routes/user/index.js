const router = require('express').Router();
const userController = require("../../controllers/user-controller");

// GET
router.get('/:id', userController.getUser);

// PUT

// POST
router.post('/', userController.createUser);

// DELETE

// PATCH
router.patch('/:id', userController.editUser);

module.exports = router;