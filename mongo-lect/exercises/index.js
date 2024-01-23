const express = require('express');
const port = 5001;
const app = express();
const studentRouter = require('./routes/studentRoutes');
const configHandlebars = require('./config/handlebarsConfig');
const configMongoose = require('./config/mongooseConfig');
const dbPath='mongodb://localhost:27017/ex';


app.use(express.json());
configHandlebars(app);
configMongoose(dbPath);
app.use(express.urlencoded({extended:false}));


app.use('/students', studentRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

