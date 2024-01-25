const router = require('express').Router();
const { readFromDb } = require('../services/movieService')
const movieService = require('../services/movieService')

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    console.log(movies);
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;
    const movies = await movieService.search(title, genre, year).lean();

    res.render('search', { movies, title, genre, year });
});


router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router