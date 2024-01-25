const castModel = require('../models/CastModel.js');


exports.getAll=()=>castModel.find();
exports.create = (castData) => castModel.create(castData);