const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, 'Username must be at least 3 characters long'],
        required: [true,'Username is required'],
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
    buying: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronics'
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