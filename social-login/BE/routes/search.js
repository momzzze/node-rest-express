const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from search routes');
});

module.exports = router;