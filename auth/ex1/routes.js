const router = require('express').Router();
const { addUser, getUserById, getUserByUsername, loginUser } = require('./data/users');
const jwt = require('jsonwebtoken');
const { auth, isAuth } = require('./middleware/authMiddleware');

router.get('/', (req, res) => {
    const isAuthenticated = !!req.user;
    const user = req.user;
    
    res.render('home', { user, isAuthenticated });
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    const body = req.body;
    const user = await loginUser(body);
    if (user) {
        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('auth', token);
        res.redirect('/');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const body = req.body;
    const user = await addUser(body);
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

router.get('/about',isAuth, (req, res) => {
    res.render('about');
});


module.exports = router;