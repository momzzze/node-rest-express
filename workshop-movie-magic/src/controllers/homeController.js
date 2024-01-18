const router = require('express').Router();
const { readFromDb } = require('../services/movieService')
const movieService = require('../services/movieService')

router.get('/', (req, res) => {
    const movies = readFromDb();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', (req, res) => {
    const { title, genre, year } = req.query;
    const filteredMovies = movieService.search( title, genre, year);

    res.render('search', { movies:filteredMovies });
});


router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router