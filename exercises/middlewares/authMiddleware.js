const jwt = require('../lib/jwt');

const auth = async (req, res, next) => {
    // get token
    const token = req.cookies['auth'];
    if (!token) {
        return next();   // GUEST user
    }
    // validate token
    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        req.user = decodedToken;
        req.isAdmin = decodedToken.role === 'admin';
        res.locals.isAuthenticated = true;
        next(); //LOGGED IN user
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

const isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    next();
}


module.exports = {
    auth,
    isAuth
}