if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');


// middlewares
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));


// db connection
const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
connectDb();



// routes
app.use('/', indexRouter);



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});