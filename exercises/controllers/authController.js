const router = require('express').Router();
const authService = require('../service/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login',async (req, res) => {
    const body = req.body;
    const token= await authService.login(body);
    console.log(token);
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const body = req.body;
    try {
        const user = await authService.register(body);
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error.message);
    }
})



module.exports = router;