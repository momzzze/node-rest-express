const castModel = require('../models/CastModel.js');

exports.create = (castData) => castModel.create(castData);