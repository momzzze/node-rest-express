const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;