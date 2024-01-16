const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

// Handlebars Middleware

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');


// Set static folder
app.use(express.static('public'));



// Routes
app.get('/', (req, res) => {
    res.render('home')
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/services', (req, res) => {
    res.render('services')
});
app.get('/contacts', (req, res) => {
    res.render('contacts')
});



// 404 page
app.get('*', (req, res) => {
    res.render('404')
});

app.listen(5001, () => {
    console.log('Server started on port 5001');
});
