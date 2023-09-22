import express from 'express';
import Joi from 'joi';

const app = express();
const port = 3000;
app.use(express.json());
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Comedy' },
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});


app.listen(port, () => { console.log(`listening on port ${port}...`) });


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return schema.validate(genre);
}