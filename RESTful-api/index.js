import express from "express";
import Joi from "joi";

const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

// take 2 arguments: URL and callback function
// callback function takes 2 arguments: req and res
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});




app.get('/api/post/:year/:month', (req, res) => {
    // res.send(req.params);  // /post/1992/5  will give me  {"year":"1992","month":"5"}
    res.send(req.query);  // /post/1992/5?sortBy=name  will give me  {"sortBy":"name"}
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    console.log(schema.validate(course));
    return schema.validate(course);
}