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
    
    res.render('details', { movie });
});


module.exports = router;