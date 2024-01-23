const express = require('express');
const Student = require('../models/studentModel');

const createStudent = async (req, res) => {
    const { name, age, grade, facultyNumber } = req.body;
    try {
        const student = await Student.findOne({ facultyNumber });
        if (student) {
            throw new Error('Student already exists');
        }
        const newStudent = new Student({
            name,
            age,
            grade,
            facultyNumber
        });
        await newStudent.save();
        res.redirect('/students/');
    } catch (error) {
        console.log(error);
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        const studentsAsJson = students.map(student => student.toJSON());
        return studentsAsJson;

    } catch (error) {
        console.log(error);
    }
}


const getStudentById = async (id) => {
    const studentById = await Student.findById(id);
    return studentById.toJSON();
}

const editStudent = async (req, res) => {
    const id = req.params.id;
    const { name, age, grade, facultyNumber } = req.body;

    const student = await Student.findById(id);

    try {
        if (!student) {
            throw new Error('Student not found');
        }

        student.name = name;
        student.age = age;
        student.grade = grade;
        student.facultyNumber = facultyNumber;
        student.save();

        Student.findByIdAndUpdate(id, student);
        res.redirect(`/students/all`);


    } catch (error) {
        console.log(error);
    }
}
const deleteStudent = async (req, res) => {
    const id = req.params.id;
    await Student.findByIdAndDelete(id);
    res.redirect('/students/all');
}


module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    editStudent,
    deleteStudent
}
