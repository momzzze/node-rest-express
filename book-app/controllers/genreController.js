const router = require('express').Router();
const genreService=require('../service/genreService');

router.get('/create', (req, res) => {
    res.render('genre/createGenre');
});
router.post('/create',async (req, res) => {
    const genreBody=req.body;
    await genreService.createGenre(genreBody);
    res.redirect('/');
});

module.exports = router;