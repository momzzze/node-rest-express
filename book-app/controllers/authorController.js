const router = require('express').Router();

const genreService = require('../service/genreService');
const authorService = require('../service/authorService');
const bookService = require('../service/bookService');

router.get('/create', async (req, res) => {
    const writingGenre = await genreService.getAllGenres();
    res.render('author/create', { writingGenre });
});

router.post('/create', async (req, res) => {
    await authorService.createAuthor(req.body);
    res.redirect('/');
});

module.exports = router;