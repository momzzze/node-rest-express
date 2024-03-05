const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    biography: {
        type: String,
        required: true,
        min: 10,
    },
    publishedBooks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
    }],
    writingGenre: [{
        type: mongoose.Types.ObjectId,
        ref: 'Genre',
    }],
}, {
    timestamps: true,
})

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;