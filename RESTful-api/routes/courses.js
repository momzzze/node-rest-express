import express from 'express';
import Joi from "joi";

const router=express.Router();

const coursesArr = [
  
]

router.get('/', (req, res) => {
    res.send(coursesArr);
});

router.get('/', (req, res) => {
    const course = coursesArr.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: coursesArr.length + 1,
        name: req.body.name
    };
    coursesArr.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = coursesArr.find(c => c.id === parseInt(req.params.id));
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

router.delete('/:id', (req, res) => {
    const course = coursesArr.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    const index = coursesArr.indexOf(course);
    coursesArr.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

export { router as courses };