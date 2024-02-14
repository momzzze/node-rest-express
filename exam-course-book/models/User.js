const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [2, 'Username should be at least 2 characters long'],
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        minLength: [10, 'Email should be at least 3 characters long'],
        required: [true, 'Email is required'],

    },
    password: {
        type: String,
        minLength: [4, 'Password should be at least 4 characters long'],
        required: [true, 'Password is required'],
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    signedCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true })

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