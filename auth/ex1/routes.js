const router = require('express').Router();
const { addUser, getUserById, getUserByUsername } = require('./data/users');


router.get('/', (req, res) => {
    const user = req.cookies.username;
    console.log(user);
    res.render('home', { user });
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    const body = req.body;
    console.log(body);
});

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    const body = req.body;
    const user=addUser(body);
    res.cookie('username', body.username);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

module.exports = router;