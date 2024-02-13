const { SECRET } = require('../config');
const jwt = require('../lib/jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login')
    }

}
const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    next();
}


module.exports = {
    authMiddleware,
    isAuth
};