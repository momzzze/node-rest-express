const { registerUser, loginUser } = require('../../controllers/AuthController');

const router = require('express').Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
// This file defines the routes for user authentication, including login and registration. It uses Express Router to handle incoming requests and delegates the logic to the AuthController.

// route path until now is /api/v1/auth/
