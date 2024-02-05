const router = require('express').Router();

router.get('/',(req,res)=>{
    const isAuthenticated=!!req.user;
    console.log(req.user);
    console.log(req.isAdmin);
    console.log(isAuthenticated);
    res.render('home');
});


router.get('/about', (req, res) => { 
    res.render('about');
});

module.exports = router;