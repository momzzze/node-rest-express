const Course = require("../models/Course");
const User = require("../models/User");

const create = async (userId, courseData) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseData
    });
    await User.findByIdAndUpdate(userId, {
        $push: { createdCourses: createdCourse._id }
    });
    return createdCourse;
}

const getAll = () => {
    return Course.find();
}
const signUp = async (courseId, userId) => {
    // await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } })
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    course.signUpList.push(userId);
    user.signedCourses.push(courseId);

    await course.save();
    await user.save();
}
const getOne = (id) => {
    return Course.findById(id).populate('owner').populate('signUpList');
}
const getOnePure = (id) => {
    return Course.findById(id);
}
const deleteOne = (id) => {
    return Course.findByIdAndDelete(id);
}

const edit = (id, courseData) => {
    return Course.findByIdAndUpdate(id, courseData, { runValidators: true });
}

const getLatest3=()=>{
    return Course.find().sort({createdAt: -1}).limit(3);
}

module.exports = {
    create,
    getAll,
    getOne,
    signUp,
    deleteOne,
    getOnePure,
    edit,
    getLatest3
}