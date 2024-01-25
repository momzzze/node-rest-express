const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');


const movies = movieService.readFromDb();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;
    try {
        await movieService.create(newMovie)
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.status(400).end();
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId
    const movie = await movieService.getOne(movieId).lean();
    const movieRating = Array.from({ length: parseInt(movie.rating) }, () => '&#x2605;');
    res.render('details', { movie, movieRating });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();
    //TODO remove already added casts
    res.render('movie/attach', { ...movie, casts })
})

router.post('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const casts = await castService.getAll();
    await movieService.attach(movieId, castId, casts);

    res.redirect(`/movies/${movieId}/attach`);
})


module.exports = router;