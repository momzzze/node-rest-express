const express = require('express');
const handlebars=require('express-handlebars');
const mongoose=require('mongoose');
const routers = require('./routes');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('hbs',handlebars.engine({
    extname:'hbs',
    defaultLayout:'main',
}));
app.set('view engine','hbs');

app.use(routers)
mongoose.connect('mongodb://localhost:27017/course-book')
mongoose.connection.on('connected',()=>console.log('DB is connected'));
mongoose.connection.on('error',(err)=>console.log(err));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
