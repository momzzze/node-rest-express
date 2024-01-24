const router = require('express').Router();
const movieService = require('../services/movieService')

const movies = movieService.readFromDb();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create',async (req, res) => {
    const newMovie = req.body;
    try {
        await movieService.create(newMovie)
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.status(400).end();
    } 
});

router.get('/movies/:movieId', (req, res) => {
    const movie = movieService.getOne(req.params.movieId);   
    const movieRating=Array.from({length:parseInt(movie.rating)},()=> '&#x2605;');
    res.render('details', { movie, movieRating });
});


module.exports = router;