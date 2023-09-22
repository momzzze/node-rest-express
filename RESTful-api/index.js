import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import debug from "debug";
import logger from "./middleware/logger.js";
import authenticator from "./middleware/authenticator.js";
import {courses} from "./routes/courses.js";
import { home } from "./routes/home.js";

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

const debugging = debug('app:startup');

app.use(express.json()); //return function req.body
app.use(logger);
app.use(authenticator);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debugging('Morgan enabled...');
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
