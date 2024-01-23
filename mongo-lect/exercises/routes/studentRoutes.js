const router = require('express').Router();
const { createStudent, getAllStudents, getStudentById,editStudent, deleteStudent } = require('../controllers/studentController');


router.get('/', (req, res) => {
    res.render('home')
});

router.get('/create', (req, res) => {
    res.render('create')
});
router.post('/create', createStudent);

router.get('/all', async (req, res) => {
    const students = await getAllStudents();
    res.render('all', { students })
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const student = await getStudentById(id);
    res.render('edit', { student })
});
router.post('/edit/:id', editStudent);

router.get('/delete/:id', deleteStudent);


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const student = await getStudentById(id);
    res.render('details', { student })
});

module.exports = router;