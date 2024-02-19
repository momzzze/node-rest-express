const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: [10, 'Email should be at least 10 characters'],
        required: [true, 'Email is required'],

    },
    password: {
        type: String,
        minLength: [4, 'Password should be at least 4 characters'],
        required: [true, 'Password is required'],
    },
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