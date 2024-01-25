const mongoose = require('mongoose');


const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 7,
        max: 120,
    },
    born: {
        type: String,
        required: true,
    },
    nameInMovie: {
        type: String,
        required: true,
    },
    castImage: {
        type: String,
        required: true,
        validate:{
            validator(value){ 
                return /^https?:\/\//.test(value)
            },
            message: (props)=>`${props.value} is invalid url for the cast image!`
        }
    },
})


const castModel = mongoose.model('Cast', castSchema);
module.exports = castModel;