const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0, max: 100 },
    grade: Number,
    facultyNumber: String,
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;