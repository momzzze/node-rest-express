const router=require('express').Router();
const genreController=require('./controllers/genreController');
const authorController=require('./controllers/authorController');
const bookController=require('./controllers/bookController');
const homeController=require('./controllers/homeController');

router.use('/genre',genreController);
router.use('/author',authorController);
router.use('/book',bookController);
router.use(homeController)


router.get('*', (req, res) => {
    res.render('404');
});


module.exports=router;