const jwt = require('jsonwebtoken');
const util = require('util');
const auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }
    try {
        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        })
        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();
    } catch (error) {
        console.log(error);
        res.clearCookie('auth');
        res.redirect('/login');
    }
}

const isAuth=(req,res,next)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    auth,
    isAuth
}