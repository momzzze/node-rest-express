const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [3, 'First name must be at least 3 characters long'],
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,        
        minLength: [3, 'Last name must be at least 3 characters long'],
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,        
        minLength: [10, 'Email must be at least 10 characters long'],
        required: [true, 'Email is required'],

    },
    password: {
        type: String,
        minLength: [4, 'Password must be at least 4 characters long'],
        required: [true, 'Password is required'],
    },
    voted: [{
        type: mongoose.Types.ObjectId,
        ref: 'Creature'
    }],
    creatures: [{
        type: mongoose.Types.ObjectId,
        ref: 'Creature'
    }]
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

// userSchema.virtual('rePassword')
//     .set(function (value) {
//         if (value !== this.password) {
//             throw new Error('Invalid credentials');
//         }
//     })

const User = mongoose.model('User', userSchema);

module.exports = User;