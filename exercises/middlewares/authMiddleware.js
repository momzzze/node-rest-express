const jwt=require('../lib/jwt');

const auth =async (req, res, next) => {
    // get token
    const token = req.cookies['auth'];
    if (!token) {
        return next();   // GUEST user
    }
    // validate token
    try {
        const decodedToken=await jwt.verify(token, process.env.SECRET);
        req.user=decodedToken;

        next(); //LOGGED IN user
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}


module.exports = {
    auth
}