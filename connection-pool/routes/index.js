const router = require('express').Router();
const authRouter = require('./Auth');

router.use('/auth', authRouter);

module.exports = router;
