const router = require('express').Router();

router.get('/',(req,res)=>{
    console.log(req.user);
    res.render('home');
});


router.get('/about', (req, res) => { 
    res.render('about');
});

module.exports = router;