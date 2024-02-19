const router = require('express').Router();
const stoneService = require('../service/stoneService');

router.get('/', async (req, res) => {
    const recent = await stoneService.getRecentThree();
    res.render('home', { stones: recent });
});

router.get('/search', async (req, res) => {
    const stones = await stoneService.getAllStones();
    res.render('search', { stones });
});

router.post('/search', async (req, res) => {
    const { name } = req.body;
    const result = await stoneService.search(name);
    res.render('search', { stones: result });
});

module.exports = router;