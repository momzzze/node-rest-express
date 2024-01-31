const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const path = require('path');
const cookieParser=require('cookie-parser');
const app = express();



app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

app.listen(3000, () => console.log('Server is listening on port 3000...'));