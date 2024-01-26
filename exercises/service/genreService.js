const Genre = require('../models/Genre');
const Book = require('../models/Book');
const Author = require('../models/Author');


const createGenre = async (genre) => {
    const findGenre = await Genre.findOne({ name: genre.name })
    try {
        // check if genre already exists
        console.log(findGenre);
        if (findGenre) {
            throw new Error('Genre already exists');
        }
        // create genre
        const createGenre = await Genre.create(genre);
        createGenre.save();
    } catch (error) {
        console.log(error);
    }
}

const getAllGenres = async () => {
    const allGenres = await Genre.find({}).lean();
    
    return allGenres;
}




module.exports = {
    createGenre,
    getAllGenres,
}