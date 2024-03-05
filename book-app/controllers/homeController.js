const router = require('express').Router();

router.get('/',(req,res)=>{
    const isAuthenticated=!!req.user;
    console.log(res.locals);
    res.render('home');
});


router.get('/about', (req, res) => { 
    res.render('about');
});

module.exports = router;