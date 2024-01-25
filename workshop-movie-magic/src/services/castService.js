const castModel = require('../models/CastModel.js');


exports.getAll = () => castModel.find();
exports.getOne = (id) => castModel.findById(id);
exports.create = (castData) => castModel.create(castData);