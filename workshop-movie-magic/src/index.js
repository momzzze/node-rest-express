const express = require('express');

const routers= require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 5001;

configHandlebars(app);
configExpress(app);

app.use(routers);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});