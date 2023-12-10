const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    name:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});


const User=mongoose.model('user',userSchema);
module.exports=User;