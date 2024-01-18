const router = require('express').Router();
const { readFromDb } = require('../services/movieService')


router.get('/', (req, res) => {
    const movies = readFromDb();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router