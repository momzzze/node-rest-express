const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: mongoose.Types.ObjectId,
        ref: 'Genre',
    },    
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
    }],
   
},
{
    timestamps: true,
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;