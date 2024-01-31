const router = require('express').Router();
const authService = require('../services/authService');
const bcrypt=require('bcrypt');

router.get('/register', (req, res) => {
    res.render('auth/register');
});
router.post('/register', async (req, res) => {
    const body = req.body;

    await authService.register(body);

    res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login', async(req, res) => {
    const body=req.body;

    const token=await authService.login(body.email,body.password);
    res.cookie('auth',token);
    res.redirect('/');
});
module.exports = router;