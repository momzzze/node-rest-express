const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
    },
    info: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: 'user'
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});
userSchema.virtual('rePassword')
.set(function (value) {
    if(this.password !== value){
        throw new mongoose.MongooseError('Passwords  don\'t match');
    }
})

module.exports = mongoose.model('User', userSchema);   