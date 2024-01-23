const mongoose = require('mongoose');
const Student=require('./models/Student');
const connectionString = 'mongodb://localhost:27017/test1';


mongoose.connect(connectionString).then(() => {
    console.log('Connected to db');
}).catch(err => {
    console.log(err);
});

//CREATE STUDENT
const student = new Student({
    name: 'Stamat',
    age: 17
})
student.save().then((student) => {
    console.log(student);
    console.log('Student saved');
});


//READ STUDENT

// get all data
Student.find().then(students=>{
    students.forEach(student=>student.logInfo())
})


Student.findOne().then(student=> {
    console.log('findOne');
    console.log(student)
});

Student.deleteMany({name:'Stamat'}).then(res=>{
    console.log(res)
});