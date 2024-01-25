// const movies = [
//     {
//         title: 'Jungle Cuise',
//         genre: 'Adventure',
//         director: 'John Doe',
//         date: '2019',
//         image: '/img/jungle-cruise.jpeg',
//         rating: '5',
//         description: 'Description: Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans.'
//     }
// ];
const movieModel = require('../models/MovieModel');

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const castModel = require('../models/CastModel');

const moviesFilePath = path.join(__dirname, '../config/database.json');

const readFromDb = () => {
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []
    }
}

const getAll = () => {
    const movies = movieModel.find()
    return movies;
}


const writeToDb = (data) => {
    fs.writeFileSync(moviesFilePath, JSON.stringify(data, null, 2), 'utf8');
}

const getOne = (id) => {
    const movie = movieModel.findById(id).populate('casts')
    return movie
}

//TODO filter result in mongoDB
const search = async (title, genre, year) => {
    let movies = await movieModel.find().lean();

    if (title) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }
    if (year) {
        movies = movies.filter(movie => movie.date === year);
    }
    return movies;

}

const create = (movieData) => {
    console.log(movieData);
    return movieModel.create(movieData);
    // const movie = {
    //     id: uuidv4(),
    //     ...movieData
    // }
    // const existingMovies = readFromDb();

    // if (existingMovies.some(movie => movie.title === movieData.title)) {
    //     return;
    // }
    // existingMovies.push(movie);
    // writeToDb(existingMovies);
}

const attach = async (movieId, castId, casts) => {
    try {
        const movie = await getOne(movieId)
        const cast = await castModel.findById(castId);
        const isItInCast = casts.some(cast => cast._id.toString() === castId);
        const isItInMovies = movie.casts.includes(castId)


        if (!isItInCast) {
            throw new Error('Cast does not exist')
        }
        if (isItInMovies) {
            throw new Error('Cast already attached')
        }
        movie.casts.push(castId);
        cast.movies.push(movie)

        await cast.save();
        return movie.save();
        // return movieModel.findByIdAndUpdate(movieId, { $push: { casts: castId } })
    } catch (error) {
        console.error(`Error in attaching cast: ${error.message}`);
    }



}

module.exports = {
    readFromDb,
    getOne,
    search,
    create,
    getAll,
    attach
}