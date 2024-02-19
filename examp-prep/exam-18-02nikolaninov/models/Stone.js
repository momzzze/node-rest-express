const mongoose = require('mongoose');


const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: [true, 'Name is required'],
    },
    category: {
        type: String,
        minLength: [3, 'Category should be at least 3 characters'],
        required: [true, 'Category is required'],
    },
    color: {
        type: String,
        minLength: [2, 'Color should be at least 2 characters'],
        required: [true, 'Color is required'],
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Image should be a valid URL'],
        required: [true, 'Image is required'],
    },
    location: {
        type: String,
        minLength: [5, 'Location should be between 5 and 15 characters'],
        maxLength: [15, 'Location should be between 5 and 15 characters'],
        required: [true, 'Location is required'],
    },
    formula: {
        type: String,
        minLength: [3, 'Formula should be between 3 and 30 characters'],
        maxLength: [30, 'Formula should be between 3 and 30 characters'],
        required: [true, 'Formula is required'],
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters'],
        required: [true, 'Description is required'],
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Stone = mongoose.model('Stone', stoneSchema);
module.exports = Stone;

// • name - string (required),
// • category - string (required),
// • color - string (required),
// • image: string (required),
// • location: string (required),
// • formula: string (required),
// • description: string (required),
// • likedList - a collection of Users (a reference to the User model)
// • owner - object ID (a reference to the User model)