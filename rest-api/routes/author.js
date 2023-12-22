const express = require('express');
const Author = require('../models/author');
const router = express.Router();


// All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);  // says that we have no conditions
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query  
        });
    } catch (error) {
        res.redirect('/');
    }
});

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// Create author route
router.post('/', async (req, res) => {
    try {
        const newAuthor = new Author({
            name: req.body.name
        });
        await Author.create(newAuthor)
        // res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`/authors`);
    } catch {
        res.render('authors/new', { author: Author, errorMessage: 'Error creating Author' });
    }

});


module.exports = router;