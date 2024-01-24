const express = require('express');
const mongoose = require('mongoose');

const routers = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 5001;

configHandlebars(app);
configExpress(app);

app.use(routers);


mongoose.connect('mongodb://localhost:27017/magic-movies').then(() => {
    console.log(`DB Connected`)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});