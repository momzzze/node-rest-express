const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../service/courseService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});
router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    try {
        await courseService.create(req.user._id, courseData);
        res.redirect('/courses');
    } catch (error) {
        res.render('courses/create', { ...courseData, error: getErrorMessage(error) });
    }
});

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses });
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOne(req.params.courseId).lean();
    const singUpUsers = course.signUpList.map(x => x.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;
    const isSigned = course.signUpList.some(x => x._id == req.user?._id);
    res.render('courses/details', { ...course, singUpUsers, isOwner, isSigned });
})

router.get('/:courseId/sign-up', async (req, res) => {
    await courseService.signUp(req.params.courseId, req.user._id);
    res.redirect(`/courses/${req.params.courseId}/details`);
})
router.get('/:courseId/edit', isOwner, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId).lean();
    res.render('courses/edit', { ...course });
})

router.post('/:courseId/edit', isOwner, async (req, res) => {
    const courseData = req.body;
    try {
        await courseService.edit(req.params.courseId, courseData);
        res.redirect(`/courses/${req.params.courseId}/details`);
    } catch (error) {
        res.render('courses/edit', { ...courseData, error: getErrorMessage(error) });
    }
});

router.get('/:courseId/delete', isOwner, async (req, res) => {
    await courseService.deleteOne(req.params.courseId);
    res.redirect('/courses');
})

async function isOwner(req, res, next) {
    const course = await courseService.getOnePure(req.params.courseId);
    if (course.owner != req.user?._id) {
        return res.redirect(`/courses/${req.params.courseId}/details`);
    }
    next();
}

module.exports = router;