const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');


const register = (userData) => {
    return User.create(userData);
}
const login = async (userData) => {
    const { email, password } = userData;
    try {
        // get the user from the database
        const user = await User.findOne({ email });
        //check if the user exists
        if (!user) {
            throw new Error('Invalid credentials');
        }
        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        //payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
            avatar: user.imageUrl
        }
        const token =await jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    register,
    login,
}