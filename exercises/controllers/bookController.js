const router = require('express').Router();
const genreService = require('../service/genreService');
const authorService = require('../service/authorService');
const bookService = require('../service/bookService');


router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();
    res.render('book/all', { books });
})

router.get('/create', async (req, res) => {
    const genres = await genreService.getAllGenres();
    const authors = await authorService.getAllAuthors();

    res.render('book/create', { genres, authors });
});

router.post('/create', async (req, res) => {
    await bookService.createBook(req.body);
    res.redirect('/');
});

module.exports = router;