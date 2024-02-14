const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'Title should be at least 5 characters long'],
        required: true
    },
    type: {
        type: String,
        minLength: [3, 'Type should be at least 3 characters long'],
        required: true
    },
    certificate: {
        type: String,
        minLength: [2, 'Certificate should be at least 2 characters long'],
        required: true
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Image URL is not valid'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        min: [0, 'Price should be a positive number'],
        required: true
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;