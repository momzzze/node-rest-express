const express = require('express');
const router = require('./routes');
const handlebarsConfig = require('./config/handlebarsConfig');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const {auth}= require('./middlewares/authMiddleware');
require('dotenv').config();

handlebarsConfig(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(auth);
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