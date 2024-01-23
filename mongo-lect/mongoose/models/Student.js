const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({   // interface on the class
    name: String,
    age: Number
})

// методи на схемата
studentSchema.methods.logInfo = function () {
    console.log(`Hello, I'm ${this.name}, and I'm ${this.age} years old`);
}

studentSchema.virtual('description').get(function () {
    return `Name, I'm ${this.name}, and I'm ${this.age} years old`;
})

const Student = mongoose.model('Student', studentSchema);  // the class
module.exports = Student;

