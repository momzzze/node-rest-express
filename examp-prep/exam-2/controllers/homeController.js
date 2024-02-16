const router = require('express').Router();
const userService = require('../service/userService');

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('home');
});

router.get('/profile', async (req, res) => {
    const {user,creatures} = await userService.getUserById(req.user._id);
    console.log(user);
    console.log(creatures);
    res.render('my-posts', { user, creatures });
});

module.exports = router;