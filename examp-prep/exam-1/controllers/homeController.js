const router = require('express').Router();
const electronicsService = require('../service/electronicsService');

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('home');
});

router.get('/search',async (req, res) => {
    const result =await electronicsService.getAll();
    console.log(result);
    res.render('search', { result });
});

router.post('/search', async (req, res) => {
    const { name, type } = req.body;
    const result = await electronicsService.search(name, type);
    console.log(result);
    res.render('search', { result, name, type });
});

module.exports = router;