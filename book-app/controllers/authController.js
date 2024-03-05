const router = require('express').Router();
const authService = require('../service/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login',async (req, res) => {
    const body = req.body;
    const token= await authService.login(body);
    res.cookie('auth', token);
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
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})


module.exports = router;