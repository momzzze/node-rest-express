const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login', (req, res) => {
    const body = req.body;
    console.log(body);
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', (req, res) => {
    const body = req.body;
    console.log(body);
})



module.exports = router;