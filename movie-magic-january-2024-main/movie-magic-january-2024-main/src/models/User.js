const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,        
        // validate: {
        //     validator: (value) => /^[A-Za-z0-9]+@[a-z]+\.[a-z]+$/.test(value),
        //     message: 'Email should be valid'
        // }
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, 'Password should be at least 8 characters long'],
        // validate: {
        //     validator: (value) => /^[A-Za-z0-9]+$/.test(value),
        //     message: 'Password should consist only english letters and digits'
        // }
    }
});

module.exports = mongoose.model('User', userSchema);