const router = require('express').Router();
const courseService = require('../service/courseService');
const userService = require('../service/userService');

router.get('/', async (req, res) => {
    const latest3Courses = await courseService.getLatest3().lean();
    res.render('home', { latest3Courses });
});
router.get('/profile', async (req, res) => {
    const user = await userService.getInfo(req.user._id);
    // const createdCourses = user.createdCourses;
    // const signedCourses = user.signedCourses;
    res.render('profile', user);
});
module.exports = router;