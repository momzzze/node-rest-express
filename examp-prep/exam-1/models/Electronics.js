const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        minLength: [10, 'Name must be at least 10 characters long'],
        required: true
    },
    type: {
        type: String,
        lowercase: true,
        minLength: [2, 'Type must be at least 2 characters long'],
        required: true
    },
    damages: {
        type: String,
        minLength: [10, 'Damages must be at least 10 characters long'],
        required: true
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Image URL is not valid'],
        required: true
    },
    description: {
        type: String,
        minLength: [10, 'Description must be between 10 and 200 characters long'],
        maxLength: [200, 'Description must be between 10 and 200 characters long'],
        required: true
    },
    production: {
        type: Number,
        min: [1900 , 'Production year must be between 1900 and 2023'],
        max: [2023, 'Production year must be between 1900 and 2023'],
        required: true
    },
    exploitation: {
        type: Number,
        min: [0, 'Exploitation must be a positive number'],
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number'],
        required: true
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Electronics = mongoose.model('Electronics', electronicsSchema);
module.exports = Electronics;