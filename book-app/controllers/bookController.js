const router = require('express').Router();
const genreService = require('../service/genreService');
const authorService = require('../service/authorService');
const bookService = require('../service/bookService');


router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = 6;
    const skip = (page - 1) * pageSize;
    const books = await bookService.getAllBooks(skip, pageSize);
    const prevPage = Math.max(1, page - 1);
    const nextPage = Math.min(page + 1, books.totalPages);
    const isFirst = page == 1;
    const isLast = page == books.totalPages;
    console.log(res.locals.isAuthenticated);
    res.render('book/all', {
        books: books.books, currentPage: page, limit: skip, totalPages: books.totalPages, prevPage,
        nextPage, isFirst, isLast
    });
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
router.get('/details/:bookId', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);
    res.render('book/details', { ...book });
});

router.get('/edit/:bookId', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);
    console.log(book);
    res.render('book/edit', { book });
});
router.post('/edit/:bookId', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);
    const editedBook = { ...book, ...req.body };
    await bookService.updateBook(editedBook._id,editedBook);
    res.redirect('/book');
});

router.get('/delete/:bookId',async(req,res)=>{
    console.log(req.params.bookId);
    await bookService.deleteBook(req.params.bookId);
    res.redirect('/book');
})

module.exports = router;