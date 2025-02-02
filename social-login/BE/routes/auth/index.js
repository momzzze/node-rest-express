const express = require("express");
const authController = require("../../controllers/auth-controller");
const userController = require("../../controllers/user-controller");

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/register", userController.createUser);

module.exports = router;