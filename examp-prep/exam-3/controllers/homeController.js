const router = require('express').Router();
const animalService = require('../service/animalService');

router.get('/', async (req, res) => {
    const animals = await animalService.getRecentThree();
    res.render('home', { animals });
});

router.get('/search', async (req, res) => {
    const animals = await animalService.getAll();
    res.render('search', { animals });
});

router.post('/search', async (req, res) => {
    const { location } = req.body;
    const animals = await animalService.search(location);
    res.render('search', { animals, location });
});



module.exports = router;