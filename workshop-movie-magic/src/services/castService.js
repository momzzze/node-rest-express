const castModel = require('../models/CastModel.js');
const movieModel = require('../models/MovieModel.js');

exports.getAll = () => castModel.find();
exports.getOne = (id) => castModel.findById(id);
exports.create = (castData) => castModel.create(castData);
exports.getByIds =  (castIds) => {
    const casts =  castModel.find({ _id: { $in: castIds } })  // give me all casts where the id is in the movie.casts array
    return casts;
}