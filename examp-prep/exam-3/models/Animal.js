const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,        
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    years: {
        type: Number,        
        min: [1, 'Number between 1 and 100'],
        max: [100, 'Number between 1 and 100'],
        required: true,
    },
    kind: {
        type: String,        
        minLength: [3, 'Kind should be at least 3 characters'],
        required: true,
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Image URL is not valid'],
        required: true,
    },
    need: {
        type: String,        
        minLength: [3, 'Need should be at least 3 characters'],
        maxLength: [20, 'Need should be at most 50 characters'],
        required: true,
    },
    location: {
        type: String,
        minLength: [5, 'Description should be at least 3 characters'],
        maxLength: [15, 'Description should be at most 50 characters'],
        required: true,
    },
    description: {
        type: String,
        minLength: [5, 'Description should be at least 3 characters'],
        maxLength: [50, 'Description should be at most 50 characters'],
        required: true,
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;



// • name – string (required)
// • years – number (required)
// • kind – string (required)
// • image – string (required)
// • need - string (required)
// • location – string (required)
// • description – string (required)
// • donations – an array of objects containing the user's ID
// • owner – object ID (a reference to the User model)