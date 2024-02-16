const mongoose = require('mongoose');


const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: [2, 'Name must be at least 2 characters long'],
    },
    species: {
        type: String,
        required: true,
        minLength: [3, 'Species must be at least 3 characters long'],
    },
    skinColor: {
        type: String,
        required: true,
        minLength: [3, 'Skin color must be at least 3 characters long'],
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: [3, 'Eye color must be at least 3 characters long'],
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image URL']
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Description must be at least 5 characters long and less than 500'],
        maxLength: [500, 'Description must be at least 5 characters long and less than 500'],
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Creature = mongoose.model('Creature', creatureSchema);
module.exports = Creature;