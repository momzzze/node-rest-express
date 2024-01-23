const mongoose = require('mongoose');

function configMongoose(dbPath) {
    mongoose.connect(dbPath).then(() => {
        console.log('Connected to db');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = configMongoose;

