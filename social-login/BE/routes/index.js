const router = require('express').Router();

const searchRoutes = require("./search");


router.use('/search', searchRoutes);
router.use('/user', require("./user"));


module.exports = router;