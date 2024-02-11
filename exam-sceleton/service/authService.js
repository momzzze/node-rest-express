const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../config');

const register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Passwords do not match');
    }
    const user = await User.findOne({ email: userData.email })
    if (user) {
        throw new Error('Email is already taken');
    }

    const createdUser = await User.create(userData);
    const token = await generateToken(createdUser);
    return token;
}
const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw { message: 'Invalid Credentials' };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw { message: 'Invalid Credentials' };
    }
    const token = await generateToken(user);
    return token;
}

const generateToken = async (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    return jwt.sign(payload, SECRET, { expiresIn: '2h' });

}

module.exports = {
    register,
    login
};