const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');


const PORT = process.env.PORT || 3000;
const AuthRoute=require('./Routes/Auth.route');
const app = express();

app.get('/', async (req, res, next) => {
    res.send("Hello from express");
});

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth',AuthRoute);

// handle Errors - should be last middleware
app.use(async (req, res, next) => {   
    next(createError.NotFound());  
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message,
        },
    });
})
//---------------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});