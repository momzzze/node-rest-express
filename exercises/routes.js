const router=require('express').Router();
const genreController=require('./controllers/genreController');
const authorController=require('./controllers/authorController');

router.use('/genre',genreController);
router.use('/author',authorController);

router.get('/',(req,res)=>{
    res.render('home');
});

router.get('*', (req, res) => {
    res.render('404');
});


module.exports=router;