const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

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

userSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();

    } catch (error) {
        next(error);    
    }
})



const User=mongoose.model('user',userSchema);
module.exports=User;