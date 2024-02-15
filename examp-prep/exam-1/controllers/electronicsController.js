const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const electronicsService = require('../service/electronicsService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});
router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;
    try {
        await electronicsService.create(req.user._id, electronicsData);
        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', { ...electronicsData, error: getErrorMessage(error) });
    }
});

router.get('/catalog', async (req, res) => {
    const electronics = await electronicsService.getAll();
    res.render('electronics/catalog', { electronics });
});

router.get('/:id/details', async (req, res) => {
    const electronics = await electronicsService.getById(req.params.id);
    const isOwner = electronics.owner && electronics.owner?._id == req.user?._id;
    const isBought = electronics.buyingList.some(x => x._id == req.user?._id);
    res.render('electronics/details', { ...electronics, isOwner, isBought });
});

router.get('/:id/buy', isAuth, async (req, res) => {
    await electronicsService.buy(req.params.id, req.user._id);
    res.redirect(`/electronics/${req.params.id}/details`);
});

router.get('/:id/edit', isOwner, async (req, res) => {
    const electronics = await electronicsService.getById(req.params.id);
    res.render('electronics/edit', { ...electronics });
});
router.post('/:id/edit', isOwner, async (req, res) => {
    const electronicsData = req.body;
    try {
        await electronicsService.updateOne(req.params.id, electronicsData);
        res.redirect(`/electronics/${req.params.id}/details`);
    } catch (error) {
        res.render('electronics/edit', { ...electronicsData, error: getErrorMessage(error) });
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {
    await electronicsService.deleteOne(req.params.id);
    res.redirect('/electronics/catalog');
});



async function isOwner(req, res, next) {
    const electronics = await electronicsService.getById(req.params.id);

    if (electronics.owner._id != req.user?._id) {
        return res.redirect(`/electronics/catalog`)
    }
    next();
}


module.exports = router;