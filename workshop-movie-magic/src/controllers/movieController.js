const router = require('express').Router();
const movieService = require('../services/movieService')

const movies = movieService.readFromDb();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const newMovie = req.body;
    movieService.create(newMovie)

    res.redirect('/');
});

router.get('/movies/:movieId', (req, res) => {
    const movie = movieService.getOne(req.params.movieId);   
    const movieRating=Array.from({length:parseInt(movie.rating)},()=> '&#x2605;');
    res.render('details', { movie, movieRating });
});


module.exports = router;