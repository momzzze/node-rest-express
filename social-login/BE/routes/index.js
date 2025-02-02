const router = require('express').Router();

const searchRoutes = require("./search");


router.use('/search', searchRoutes);
router.use('/user', require("./user"));
router.use('/auth', require("./auth"));


module.exports = router;