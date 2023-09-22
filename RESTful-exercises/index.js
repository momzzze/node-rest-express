import express from 'express';
import { genres } from './routes/genres.js';
import { home } from './routes/home.js';

const app = express();
const port = 3001;
app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);
app.listen(port, () => { console.log(`listening on port ${port}...`) });