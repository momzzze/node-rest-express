const router=require('express').Router();
const genreController=require('./controllers/genreController');

router.use('/genre',genreController);
router.get('/',(req,res)=>{
    res.render('home');
});

router.get('*', (req, res) => {
    res.render('404');
});


module.exports=router;