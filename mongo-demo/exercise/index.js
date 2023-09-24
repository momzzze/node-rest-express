const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

const getCourses = async () => {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })

}
const getCoursesByPriceDesc = async () => {
    return await Course
        .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        .sort('-price')
        .select('name author')

}
const getCoursesByPriceMoreThanFifteen = async () => {
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ]);
}
async function updateCourse(id) {
    const course = await Course.findOne({ _id: id });
    console.log(course);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}
const id='5a68ff090c553064a218a547';
updateCourse(id);

// const courses=getCourses().then(result=>console.log(result));
// const coursesByPrice = getCoursesByPriceDesc().then(result => console.log(result));
// const coursesByPrice = getCoursesByPriceMoreThanFifteen().then(result => console.log(result));
