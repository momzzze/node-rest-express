const express = require('express');
const router = require('./routes');
const handlebarsConfig = require('./config/handlebarsConfig');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

handlebarsConfig(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(router);

mongoose.connect('mongodb://localhost:27017/bookList').then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
})

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});