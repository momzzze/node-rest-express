const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../service/stoneService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('stone/create');
});
router.post('/create', isAuth, async (req, res) => {
    const stoneData = req.body;
    try {
        await stoneService.create(stoneData, req.user?._id);
        res.redirect('/stone/dashboard');
    } catch (error) {
        res.render('stone/create', { ...stoneData, error: getErrorMessage(error) });
    }
});
router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAllStones();
    res.render('stone/dashboard', { stones });
});
router.get('/:id/details', async (req, res) => {
    const stone = await stoneService.getOne(req.params.id);
    const isOwner = stone.owner._id == req.user?._id;
    const isLiked = stone.likedList.some(like => like._id == req.user?._id);
    res.render('stone/details', { ...stone, isOwner, isLiked });
});
router.get('/:id/like', isAuth, async (req, res) => {
    await stoneService.like(req.params.id, req.user?._id);
    res.redirect(`/stone/${req.params.id}/details`);
});
router.get('/:id/edit', isOwner, async (req, res) => {
    const stone = await stoneService.getOne(req.params.id);
    res.render('stone/edit', { ...stone });
});
router.post('/:id/edit', isOwner, async (req, res) => {
    const stoneData = req.body;
    try {
        await stoneService.edit(req.params.id, stoneData);
        res.redirect(`/stone/${req.params.id}/details`);
    } catch (error) {
        res.render('stone/edit', { ...stoneData, error: getErrorMessage(error) });
    }
});
router.get('/:id/delete', isOwner, async (req, res) => {
    await stoneService.deleteOne(req.params.id);
    res.redirect('/stone/dashboard');
});
async function isOwner(req, res, next) {
    const stone = await stoneService.getById(req.params.id);

    if (stone.owner._id != req.user?._id) {
        return res.redirect(`/stone/dashboard`)
    }
    next();
}

module.exports = router;